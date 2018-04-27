process.stdin.resume(); //so the program will not close instantly

require('dotenv').config();

const mongoose = require('mongoose');
const chalk = require('chalk');
const log = console.log;

var winston = require('winston');
require('winston-daily-rotate-file');

var watcherETH = require('./src/ethereum/watcher');

var transport = new (winston.transports.DailyRotateFile)({
  filename: 'logs/application-%DATE%.log',
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d'
});

var logger = new (winston.Logger)({
  transports: [
    transport
  ]
});

// connect to mongo db
var isConnectedBefore = false;
const connectDatabase = () => {
  mongoose.connect(process.env.MONGODB_URI, {
    auto_reconnect: true,
    server: {
      socketOptions: {
        keepAlive: 9999999 * 9999999 * 9999999
      }
    }
  });
}
connectDatabase();

mongoose.connection.on('error', () => {
  let msg = `Unable to connect to database: ${process.env.MONGODB_URI}`;
  logger.error(msg);
});

mongoose.connection.on('connected', () => {
  isConnectedBefore = true;
  var msg = 'Connection established to MongoDB';
  log(msg);
  logger.info(msg);
});

mongoose.connection.on('disconnected', () => {
  let msg = `Disconnected from database`;
  if (!isConnectedBefore) {
    connectDatabase();
  }
  log(msg);
  logger.error(msg);
});

const startProcess = () => {
  var msg = 'Starting Process...';
  log(msg);
  logger.info(msg);
  watcherETH.Start();
}

startProcess();

process.on('exit', () => {
  logger.info('Exit Process...');
});

function exitHandler(options, err) {
    if (options.cleanup) console.log('Application has been closed!');
    if (err) console.log(err.stack);
    if (options.exit) process.exit();
}

// do something when app is closing
process.on('exit', exitHandler.bind(null,{cleanup:true}));

// catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {exit:true}));

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler.bind(null, {exit:true}));
process.on('SIGUSR2', exitHandler.bind(null, {exit:true}));

// catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {exit:true}));