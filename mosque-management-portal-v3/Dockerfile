# Step 1: Build the React app
FROM node:18 AS build

LABEL authors="Fazrul" \
	  maintainer="Fazrul" \
      version="1.0" \
      description="Spring Boot application container that pulls configuration from GitHub"

ENV ACTIVE_PROFILE=local
ENV PORT=5173

WORKDIR /app

COPY package*.json /app/
RUN npm install

# Copy the rest of the application files
COPY . ./

# Build the app for production
RUN npm run build

# Step 2: Serve the app with Nginx
FROM nginx:alpine

# Copy the build output from the build container
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the port that the app will run on
EXPOSE 5173

# Start Nginx to serve the app
CMD ["nginx", "-g", "daemon off;"]
