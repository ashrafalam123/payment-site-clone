import express from "express";
import db from "@repo/db/client";
import zod from "zod"
const app = express();

app.use(express.json())

const paymentBodySchema = zod.object({
    token: zod.string(),
    userId: zod.string(),
    amount: zod.number()
})

app.post("/hdfcWebhook", async (req, res) => {
    //TODO: Add zod validation here?
    //TODO: HDFC bank should ideally send us a secret so we know this is sent by them
    const paymentInformation: {
        token: string;
        userId: string;
        amount: string
    } = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    };
    const status = await db.onRampTransaction.findFirst({
        where: {
            token: paymentInformation.token
        }
    })
    if(!status)
    {
        res.status(400).send("Invalid token")
    }
    if(status?.status === "Success")
    {
        res.status(400).send("Request already handled")
    }
    try {
        await db.$transaction([
            db.balance.updateMany({
                where: {
                    userId: Number(paymentInformation.userId)
                },
                data: {
                    amount: {
                        // You can also get this from your DB
                        increment: Number(paymentInformation.amount)
                    }
                }
            }),
            db.onRampTransaction.updateMany({
                where: {
                    token: paymentInformation.token
                }, 
                data: {
                    status: "Success",
                }
            })
        ]);

        res.json({
            message: "Captured"
        })
    } catch(e) {
        console.error(e);
        res.status(411).json({
            message: "Error while processing webhook"
        })
    }

})

app.listen(3003);