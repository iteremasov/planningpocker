FROM nginx:alpine

RUN apk update && apk add nodejs-current-npm python g++ make && rm -rf /var/cache/apk/*

WORKDIR pplanning-client

COPY . .

RUN npm ci
RUN npm run build
RUN ls
RUN rm /etc/nginx/conf.d/default.conf
RUN cp ./default.conf /etc/nginx/conf.d
