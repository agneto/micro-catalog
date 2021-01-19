#!/bin/bash

npm config set cache /home/node/app/.npm-cache --global

# chomod 777 /home/node/app

cd /home/node/app

npm install

nodemon -L
