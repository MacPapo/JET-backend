# Development
FROM node:18.15.0-slim as dev
LABEL MAINTAINER="Jacopo Costantini <jacopocostantini32@gmail.com>"

# Copy the project files to the container
ADD . /app

# Set the working directory
WORKDIR /app

# Install express, mongoose, typescript and nodemon
RUN npm i

# Production
FROM dev as prod

ENV NODE_PATH=./build

RUN npm run build
