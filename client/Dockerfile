FROM nginx:alpine

#RUN apk add  --no-cache --repository http://dl-cdn.alpinelinux.org/alpine/v3.7/main/ nodejs-current-npm
RUN apk update && apk add nodejs-current-npm python g++ make && rm -rf /var/cache/apk/*

WORKDIR pplanning-client

COPY . .

RUN npm ci
RUN npm run build
RUN ls
RUN cp -R ./build/* /usr/share/nginx/html
