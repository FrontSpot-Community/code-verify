FROM node:8.9-alpine

RUN mkdir /app
WORKDIR /app

COPY package.json /app
RUN yarn install

COPY . /app

EXPOSE 3002

CMD ["yarn", "start"]