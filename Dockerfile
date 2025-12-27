FROM node:20-slim

WORKDIR /app

COPY package.json package-lock.json ./
COPY prisma ./prisma
RUN npm ci --include=dev

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
