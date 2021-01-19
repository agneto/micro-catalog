FROM node:12.14.0-alpine3.11

RUN apk add --no-cache bash

RUN touch /root/.bashrc | echo "PS1='w$ '" >> /root/.bashrc

#RUN npm config set cache /home/node/app/.npm-cache --global

RUN npm install -g nodemon
RUN npm install -g @loopback/cli

RUN mkdir -p /home/node/app
RUN chmod -R 777 /home/node/app

RUN mkdir -p /usr/share/elasticsearch/data
RUN chmod 777 -R /usr/share/elasticsearch/data

#USER node

WORKDIR /home/node/app
