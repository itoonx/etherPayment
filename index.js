require('dotenv').config();

const chalk = require('chalk');
const log = console.log;

var Web3 = require('web3');
var web3 = new Web3();

const setProvider = () => {
  const server = `http://${process.env.RPCHOST}:${process.env.RPCPORT}`;
  log(chalk.yellow('Trying to connect', server));
  web3.setProvider(new web3.providers.HttpProvider(server));
}

const blockWatcher = () => {

}

const startProcess = () => {
  setProvider();
  blockWatcher();
}

startProcess();

