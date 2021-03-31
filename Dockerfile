FROM node:12.18.1

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
# RUN npm ci --only=production

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "start" ]
