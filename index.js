const express = require('express');
const mongoose = require('mongoose');
const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
} = require('./.config/config');

const postRouter = require('./routes/postRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

const connectWithRetry = () => {
  mongoose
    .connect(mongoURL) //able to IP address, but mongo(which is from docker-compose.yml services name) is better cuz you dont have to change every single time you run.
    .then(() => console.log('successfully connected to DB'))
    .catch((e) => {
      console.log(e);
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('<h2>Hello World!!!<lsh2>');
});

// localhost:3000/api/v1/post
app.use('/api/v1/posts', postRouter);
app.use('/api/v1/users', userRouter);
const port = process.env.PORT || 3000;

app.listen(port, () =>
  console.log(`listening on port http://localhost:${port}`)
);
