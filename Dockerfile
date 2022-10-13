ARG IMAGE_TAG
FROM node:$IMAGE_TAG
COPY . /app
WORKDIR /app

CMD npm test

