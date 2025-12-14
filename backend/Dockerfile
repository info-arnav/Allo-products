# Use Node ARG for flexibility
ARG NODE_VERSION=22.11.0
FROM node:${NODE_VERSION}-alpine AS base

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN addgroup -S app && adduser -S -G app app

RUN chown -R app:app /usr/src/app

USER app

EXPOSE 1234

CMD ["npm", "run", "start"]