import { Card } from "@repo/ui/card"

export const ReceivedMoneyCard = ({
    transactions
}: {
    transactions: {
        time: Date,
        amount: number,
    }[]
}) => {
    if (!transactions.length) {
        return <Card title="Received Transactions">
            <div className="text-center pb-8 pt-8">
                No Recent transactions 
            </div>
        </Card>
    }
    return <Card title="Received Transactions">
        <div className="pt-2">
            {transactions.map(t => <div className="flex justify-between">
                <div>
                    <div className="text-sm">
                        Received INR
                    </div>
                    <div className="text-slate-600 text-xs">
                        {t.time.toDateString()}
                    </div>
                </div>
                <div className="flex flex-col justify-center">
                    + ₹ {t.amount / 100}
                </div>
            </div>)}
        </div>
    </Card>
}