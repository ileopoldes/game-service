FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig*.json ./
COPY .env ./
COPY yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["node", "dist/main"]
