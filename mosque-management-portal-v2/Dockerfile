FROM node:16

LABEL authors="Fazrul" \
	  maintainer="Fazrul" \
      version="1.0" \
      description="Spring Boot application container that pulls configuration from GitHub"

ENV ACTIVE_PROFILE=local
ENV PORT=3001

WORKDIR /app

COPY package*.json /app/

RUN npm install -g serve

COPY ./build /app/build

EXPOSE 3001

CMD ["serve", "-s", "build", "-l", "3001"]