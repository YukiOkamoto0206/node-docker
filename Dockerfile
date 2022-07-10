# setting node version from Docker Hub (https://hub.docker.com/_/node)
FROM node:16.16.0
# container of working directory
WORKDIR /app
# want to copy package.json to /app/package.json
COPY package.json .
RUN npm install

# 変数
ARG NODE_ENV

RUN if [ "$NODE_ENV" == "development" ]; \
      then npm install; \
      else npm install --only=production; \
      fi

# copy everything in this local to Docker Image
COPY . ./
ENV PORT 3000
# docker runコマンドを使用して、ホスト上のポートとコンテナのポートを紐づけます。
# It doesnt mean port is 3000, but 
EXPOSE $PORT
# run the container
CMD [ "node", "index.js" ]
