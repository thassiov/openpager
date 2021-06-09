FROM node:12-slim as build

WORKDIR /app/build

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install 

COPY . .

RUN npm run build

RUN cp ./dist/bundle.js ../


FROM gcr.io/distroless/nodejs:12

COPY --from=build /app/bundle.js /
CMD [ "bundle.js" ]
