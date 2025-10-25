# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Expose the port the app runs on
EXPOSE 5173

# Command to run the Vite development server
# The '--host' flag is important to expose the server to the host machine from the container
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
