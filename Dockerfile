FROM node:18.15.0-slim
LABEL MAINTAINER="Jacopo Costantini <jacopocostantini32@gmail.com>"

# expose the port
EXPOSE 4000

# Working directory
WORKDIR /node

COPY package*.json ./

RUN chown -R node:node .
USER node

RUN npm install && npm cache clean --force

WORKDIR /node/app

# Copy the rest of the application files
COPY --chown=node:node . .

# Start the server using ng
CMD [ "npm", "run", "start" ]
