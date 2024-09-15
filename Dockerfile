# Dockerfile

FROM node:20.15-alpine3.19
RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
EXPOSE 8000
CMD [ "npm", "start"]