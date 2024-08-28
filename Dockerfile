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

# Start the application
CMD ["npm", "start"]


# TODO 
#  1. make this a multistage docker build 
#  2. make the image smaller by using a smaller base image
#  3. add a healthcheck to the dockerfile
