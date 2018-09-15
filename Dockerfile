FROM node:8-alpine

# set working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3200

CMD [ "npm", "start" ]
