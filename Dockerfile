FROM node:17

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npm run build

FROM node:17

WORKDIR /usr/src/app

COPY --from=0 /usr/src/app/build ./build
RUN npm install serve -g

ENV NODE_ENV=prod
CMD ["serve", "-s", "build"]