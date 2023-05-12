FROM node:18.15.0-slim
LABEL MAINTAINER="Jacopo Costantini <jacopocostantini32@gmail.com>"

# Create a non-root user to run the application
RUN addgroup --system --gid 1001 backend && \
    adduser --system --uid 1001 --home /home/backend --shell /bin/bash --ingroup backend backend

# Working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install packages as a separate layer
RUN npm ci --quiet --no-cache --no-progress

# Copy the rest of the application files
COPY . .

# Set the correct ownership for the application files
RUN chown -R backend:backend /app
USER backend

# expose the port
EXPOSE 4000

# Start the server using ng
CMD [ "npm", "run", "dev" ]
