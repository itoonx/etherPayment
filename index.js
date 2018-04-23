require('dotenv').config();

const mongoose = require('mongoose');
const chalk = require('chalk');
const log = console.log;

var Web3 = require('web3');
var web3 = new Web3();

const setProvider = () => {
  const server = `http://${process.env.RPCHOST}:${process.env.RPCPORT}`;
  log(chalk.yellow('Trying to connect', server));
  web3.setProvider(new web3.providers.HttpProvider(server));
}

// connect to mongo db
mongoose.connect(process.env.MONGODB_URI, { server: { socketOptions: { keepAlive: 3600 } } });
mongoose.connection.on('error', () => {
  throw new Error(`Unable to connect to database: ${process.env.MONGODB_URI}`);
});

const blockWatcher = () => {

}

const startProcess = () => {
  setProvider();
  blockWatcher();
}

startProcess();

