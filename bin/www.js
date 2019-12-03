#!/usr/bin/env node

const app = require('app');
const mongoose = require('mongoose');
const path = require('path');

const logger = require(path.resolve('lib/logger'));

mongoose.Promise = global.Promise;

logger.debug('mongo: ' + process.env.MONGODB_URI + ' autoIndex: ' + (process.env.MONGODB_AUTOINDEX === 'true'));

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.MONGODB_URI, {
  config: {
    autoIndex: process.env.MONGODB_AUTOINDEX === 'true'
  }
});
mongoose.connection.on('error', (err) => {
  logger.error(`MongoDB connection error> ${err}`);
  process.exit();
});
mongoose.connection.on('open', () => {
  logger.info(`MongoDB opened> ${process.env.MONGODB_URI}`);
});

const port = process.env.PORT || 3000;
app.listen(port, (err) => {
  if (err) {
    logger.error(`Failed to start server on port ${port}`);
    logger.error(err);
  } else {
    logger.info(`Server is listening on port ${port}`);
    logger.info(`Running in ${app.get('env')}`);
  }
}).on('error', (err) => {
  logger.error('Error starting server');
  logger.error(err);
  if (err.errno === 'EADDRINUSE') {
    logger.error(`The port ${port} is already in use.`);
  }
});
