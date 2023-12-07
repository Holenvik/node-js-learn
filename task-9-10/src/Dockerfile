# Use a minimal base image
FROM node:15-alpine

# Set the working directory in the container
WORKDIR ./

# Install production dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of the application code
COPY .. .

# Expose the port your Nest.js application is listening on (adjust as needed)
EXPOSE 3001

# Set the startup command to run the "migrate" script
# CMD ["npm", "run", "migrate"]

# Start your Nest.js application
CMD ["npm", "run", "start:dev"]
