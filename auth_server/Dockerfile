FROM node:14.15-alpine

WORKDIR /app

COPY ./auth_server/package.json ./auth_server/package-lock.json ./
RUN npm install

RUN mkdir ./src
COPY ./auth_server/src ./src

CMD ["node", "./src/server.js"]