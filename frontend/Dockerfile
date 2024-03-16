# Use official Node.js image as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code to the working directory
COPY . .

# Build the React app
RUN yarn build

# Expose port 80 (the default port for nginx)
EXPOSE 3001

# Command to start nginx
CMD ["yarn", "start"]
