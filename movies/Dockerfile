FROM node:14.15-alpine

WORKDIR /movies

COPY ./movies/package-lock.json ./movies/package.json ./
RUN npm install

RUN mkdir ./models
RUN mkdir ./test
COPY ./movies/models ./models
COPY ./movies/test ./test
COPY ./movies/app.js ./

CMD ["node", "./app.js"]