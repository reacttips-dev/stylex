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
    chalk.yellow('>>> Static server is running in mode: development'),
    // chalk.yellow('\n>>> Main server URL is:', API_URL),
    Date.now()
  );

  console.info(
    chalk.cyan(
      `Ready! Static server is running at: 5008 now. Have fun!`
    )
  );
});
