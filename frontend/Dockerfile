FROM node:alpine as builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

FROM node:alpine
WORKDIR /app
COPY --from=builder /app /app
RUN yarn global add serve
EXPOSE 3000
CMD [ "yarn", "start" ]