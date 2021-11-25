# declare node version
FROM node:14

# create app directory working
WORKDIR /register-aws

# copy file package.json
COPY package*.json ./

# install dependencies
RUN npm install

# bundle app source
COPY . .

RUN npm run build

# run to start server
CMD ["node", "server.js"]
