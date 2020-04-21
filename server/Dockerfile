FROM node:12

RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get install -y redis-server
RUN set -i "/daemonize no/daemonize yes/" /etc/redis/redis.conf

WORKDIR pplanning-server

COPY . .

RUN npm ci
RUN npm i -g pm2

CMD redis-server --daemonize yes && npx pm2-runtime ./app.js
