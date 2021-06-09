FROM node:12-slim as build

WORKDIR /app/build

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install 

COPY . .

RUN npm run build

RUN cp ./dist/bundle.js ../


FROM node:12-alpine

WORKDIR /app

COPY --from=build /app/bundle.js /app

CMD [ "node", "./bundle.js" ]
