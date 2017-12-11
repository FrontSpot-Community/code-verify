FROM node:8.9-alpine

RUN mkdir /app
WORKDIR /app

COPY package.json /app
RUN yarn install

COPY . /app

EXPOSE 3000

CMD ["yarn", "start"]