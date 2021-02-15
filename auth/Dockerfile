FROM node:14.15-alpine

WORKDIR /auth

COPY ./auth/package.json ./auth/package-lock.json ./
RUN npm install

RUN mkdir ./src
COPY ./auth/src ./src

CMD ["node", "./src/server.js"]