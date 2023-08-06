FROM node:18-bullseye AS basic

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

RUN npm run build

FROM node:18-bullseye
RUN apt update && apt install libssl-dev dumb-init -y --no-install-recommends
WORKDIR /app
COPY --from=basic /app/dist ./dist
COPY --from=basic /app/.env .env
COPY --from=basic /app/prisma ./prisma
COPY --from=basic /app/package*.json .
RUN npm install --omit=dev
COPY --from=basic /app/node_modules/.prisma/client  ./node_modules/.prisma/client

EXPOSE 4000
CMD [ "dumb-init", "npm", "run", "start:migrate:prod" ]