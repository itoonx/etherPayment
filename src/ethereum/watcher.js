
const { promisify } = require('util');

const Web3 = require('web3');
const chalk = require('chalk');

const redis = require("redis");
const client = redis.createClient();

const ProviderEngine = require('web3-provider-engine/index.js');
const ZeroClientProvider = require('web3-provider-engine/zero.js');

const engine = ZeroClientProvider({
  getAccounts: function(){},
  rpcUrl: 'https://ropsten.infura.io/437dYfr0YRK9UHuIyByD',
});
const web3 = new Web3(engine);

client.on("error", function (err) {
  throw new Error(err);
});

const getBlock = (blockhash) => {
  return new Promise((resolve, reject) => {
    web3.eth.getBlock(blockhash, (err, res) => {
      if (err) return reject(err);
      return resolve(res);
    });
  });
}

const getTransactionByBlockHash = (block) => {
  return new Promise((resolve) => {
    return resolve(block.transactions);
  });
}

const decodeReceipt = (txid) => {
  return new Promise((resolve, reject) => {
    web3.eth.getTransactionReceipt(txid, (err, res) => {
      if (err) return reject(err);
      return resolve(res);
    });
  });
}

const Start = () => { 

  // log new blocks
  engine.on('block', async (block) => {

    var blockhash = '0x'+block.hash.toString('hex');

    console.log('================================');
    console.log('BLOCK CHANGED:', '#'+block.number.toString('hex'), blockhash);
    console.log('================================');
    
    var block = await getBlock(blockhash);
    var txs = await getTransactionByBlockHash(block);

    txs.map( async (tx, index) => {

      var receipt = await decodeReceipt(tx);
      
      
    });
  })
}

module.exports = {
  Start
}
