const express = require('express');

const app = express();
require('express-async-errors');
const cors = require('cors');

const mongoose = require('mongoose');

const blogRouter = require('./controllers/blog');
const userRouter = require('./controllers/user');
const loginRouter = require('./controllers/login');
const resetRouter = require('./controllers/test_reset');

const config = require('./utils/config');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');

mongoose
  .connect(config.mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    logger.info(`connected to MonoDB ${config.mongoUrl}`);
  })
  .catch((error) => {
    logger.error(error);
  });

app.use(cors());
app.use(express.json());

// extract TOKEN
// app.use(middleware.getTokenFromRequest);

app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);

if (process.env.NODE_ENV === 'test') {
  app.use('/api/test', resetRouter);
}

app.use(middleware.requestLogger);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
