FROM node:14.15-alpine

WORKDIR /app

COPY ./package.json ./package-lock.json ./
RUN npm install

RUN mkdir ./models
RUN mkdir ./test
COPY ./models ./models
COPY ./test ./test

CMD ["node", "./app.js"]