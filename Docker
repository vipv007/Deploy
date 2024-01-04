# Use the official Node.js image as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the remaining application code
COPY . .

# Expose port 4200
EXPOSE 4200

# Define the command to run your application
CMD [ "npm", "start" ]
