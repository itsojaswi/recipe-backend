# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /home/node/app

# Copy package.json and package-lock.json (if available) to the working directory
COPY package*.json ./

# Install dependencies as root user
RUN npm install

# Copy the rest of the application code to the working directory
COPY --chown=node:node . .

# Switch to the node user to run the application
USER node

# Expose the port your application will run on
EXPOSE 4000

# healthcheck
HEALTHCHECK --interval=30s --timeout=10s --retries=3 \
  CMD curl -f http://localhost:4000/ || exit 1

# Start the application
CMD ["npm", "start"]

