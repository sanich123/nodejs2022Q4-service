FROM node:18-alpine AS basic

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma

RUN npm ci --omit=dev

COPY . .

RUN npm run build

EXPOSE 4000
CMD [ "npm", "run", "start:migrate:prod" ]