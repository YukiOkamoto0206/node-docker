const express = require('express');
const mongoose = require('mongoose');
const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
} = require('./.config/config');

const app = express();

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

mongoose
  .connect(mongoURL) //able to IP address, but mongo(which is from docker-compose.yml services name) is better cuz you dont have to change every single time you run.
  .then(() => console.log('successfully connected to DB'))
  .catch((e) => console.log(e));

app.get('/', (req, res) => {
  res.send('<h2>Hello World!!!<lsh2>');
});

const port = process.env.PORT || 3000;

app.listen(port, () =>
  console.log(`listening on port http://localhost:${port}`)
);
