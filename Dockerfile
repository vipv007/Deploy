# Use the official Node.js image as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install Node.js dependencies
RUN npm install --production

# Copy the remaining application code
COPY . .

# Expose port (adjust this if your application listens on a different port)
EXPOSE 4200

# Define the command to run your application
CMD [ "npm", "start" ]
