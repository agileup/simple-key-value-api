const winston = require('winston');

winston.remove(winston.transports.Console);

winston.add(winston.transports.Console, {
    level: process.env.LOG_LEVEL || 'info',
    timestamp: true,
    handleExceptions: true,
    json: false,
    colorize: true,
  }
);

module.exports = winston;
