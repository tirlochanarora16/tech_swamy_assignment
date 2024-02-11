# Use official Node.js image as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code to the working directory
COPY . .

# Expose port 3000 (or any other port your NestJS app is listening to)
EXPOSE 3000

# Command to run the application
CMD ["yarn", "start:dev"]
