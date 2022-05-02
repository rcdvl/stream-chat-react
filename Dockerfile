FROM node:14-alpine

WORKDIR /scr

COPY . .

RUN yarn --ignore-scripts --frozen-lockfile

ENV CI=true

ENTRYPOINT ["yarn", "run"]