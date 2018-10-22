## Specifies the base image we're extending
FROM node:10

## Create base directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

## Install packages using NPM 5 (bundled with the node:9 image)
COPY ./package.json /usr/src/app/package.json
COPY ./package-lock.json /usr/src/app/package-lock.json

RUN npm install

RUN npm install -g nodemon

RUN npm install @mysql/xdevapi --save

## Add application code
COPY ./bin /usr/src/app/bin
COPY ./connection /usr/src/app/connection
COPY ./public /usr/src/app/public
COPY ./routes /usr/src/app/routes
COPY ./views /usr/src/app/views
COPY ./app.js /usr/src/app/app.js

## Allows port 3000 to be publicly available
EXPOSE 3000

## The command uses nodemon to run the application
CMD ["nodemon"]