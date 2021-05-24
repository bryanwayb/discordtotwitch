FROM node:alpine
ENV NPM_CONFIG_LOGLEVEL info

COPY package*.json ./
RUN npm install

COPY . .

CMD [ "node", "./src/index" ]