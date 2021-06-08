FROM node:12-alpine

WORKDIR /app/build

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install 

COPY . .

RUN npm run build

RUN cp ./dist/bundle.js ../

WORKDIR /app

RUN rm -rf build

CMD [ "node", "./bundle.js" ]
