FROM node:18.15.0-slim
LABEL MAINTAINER="Jacopo Costantini <jacopocostantini32@gmail.com>"

# Working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Copy source code
COPY . .

# Install dependencies
RUN npm install

# Start the server using nodemon
CMD [ "npm", "run", "dev" ]
