import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
import bcrypt from "bcrypt";
async function main({password_1,password_2} : {password_1: string,password_2: string}) {
    const hashed_password1 = await bcrypt.hash(password_1,10);
    const hashed_password2 = await bcrypt.hash(password_2,10);
  const alex = await prisma.user.upsert({
    where: { number: '111111144' },
    update: {},
    create: {
      number: '111111144',
      password: hashed_password1,
      name: 'alex',
      Balance:{
        create: {
        amount: 20000,
        locked: 0
        }
      },
      OnRampTransaction: {
        create: {
          startTime: new Date(),
          status: "Success",
          amount: 20000,
          token: "127",
          provider: "HDFC Bank",
        },
      },
    },
  })
  const bobby = await prisma.user.upsert({
    where: { number: '111111155' },
    update: {},
    create: {
      number: '111111155',
      password: hashed_password2,
      name: 'bobby',
      Balance:{
        create: {
        amount: 50000,
        locked: 400
        }
      },
      OnRampTransaction: {
        create: {
          startTime: new Date(),
          status: "Failure",
          amount: 2000,
          token: "126",
          provider: "HDFC Bank",
        },
      },
    },
  })
  console.log({ alex, bobby })
}
main({password_1: "test1",password_2: "test2"})
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })