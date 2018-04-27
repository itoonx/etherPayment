
const Web3 = require('web3');
const chalk = require('chalk');

const Start = () => {

  const ProviderEngine = require('web3-provider-engine/index.js');
  const ZeroClientProvider = require('web3-provider-engine/zero.js');

  const engine = ZeroClientProvider({
    getAccounts: function(){},
    rpcUrl: 'https://mainnet.infura.io/437dYfr0YRK9UHuIyByD',
  });
  const web3 = new Web3(engine);

  // log new blocks
  engine.on('block', (block) => {
    console.log('================================');
    console.log('BLOCK CHANGED:', '#'+block.number.toString('hex'), '0x'+block.hash.toString('hex'));
    console.log('================================');
  })

}

module.exports = {
  Start
}
