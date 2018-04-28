const Web3 = require('web3');
const ProviderEngine = require('web3-provider-engine/index.js');
const ZeroClientProvider = require('web3-provider-engine/zero.js');

const engine = ZeroClientProvider({
  getAccounts: function(){},
  rpcUrl: 'https://mainnet.infura.io/437dYfr0YRK9UHuIyByD',
});
const web3 = new Web3(engine);

module.exports = { web3, engine };