FROM node:latest

WORKDIR /usr/src/middleware

COPY . /usr/src/middleware/

RUN npm install

ENTRYPOINT [ "node", "src/server.js" ]