/**
 * Copyright (c) Ladifire, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const winston = require('winston');
const appRoot = require('app-root-path');

const options = {
  file: {
    level: 'error',
    filename: `${appRoot.path}/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 52428800, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: 'error',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'error' : 'debug',
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File(options.file),
  ],
});

logger.stream = {
  write: function(message, encoding) {
    logger.info(message);
  },
};

module.exports = logger;
