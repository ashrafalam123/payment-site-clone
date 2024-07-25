FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3001

CMD ["sh", "-c", "cd packages/db && npx prisma migrate dev --name init && npx prisma generate && npx prisma db seed && cd ../../apps/user-app/bank-webhook && npm run dev"]
