/**
 * Copyright (c) Ladifire, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Create a server for app

// Transpile all code following this line with babel and use '@babel/preset-env' (aka ES6) preset.
// require("babel-core/register");
require("babel-polyfill");

const express = require('express'),
  compression = require('compression'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  http = require('http'),
  useragent = require('express-useragent'),
  morgan = require('morgan'),
  chalk = require('chalk'),
  winston = require('./log');

const server = express();

const appPort = process.env.APP_PORT || 5008;
const IS_DEV =  true;

if (IS_DEV) {
  server.use(morgan('dev'));
} else {
  server.use(morgan('combined', {stream: winston.stream}));
}

server.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

server.use(useragent.express());
server.use(compression());
server.use(bodyParser.json({limit: '50mb', extended: true}));
server.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
server.use(cookieParser());
server.use(express.json());
server.disable('x-powered-by');

server.use(express.static(__dirname + '/dist'));

server.get('*', function(req, res){
  res.sendfile(__dirname + '/dist/index.html');
});

const staticServer = http.createServer( server );

staticServer.listen(appPort, err => {
  if (err) throw err;

  console.log(
    chalk.yellow(`>>> Server is running on port: ${appPort}`),
    Date.now()
  );
});
