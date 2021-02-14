FROM node:14.15-alpine

WORKDIR /movie

COPY ./movies_app/package.json ./movies_app/package-lock.json ./
RUN npm install

RUN mkdir ./models
RUN mkdir ./test
COPY ./movies_app/models ./models
COPY ./movies_app/test ./test
COPY ./movies_app ./

CMD ["node", "./app.js"]