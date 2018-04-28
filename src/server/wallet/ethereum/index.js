
const etherwallet = require('ethereumjs-wallet');
const httpStatus = require('http-status');

const { web3 } = require('../../../config/web3provider');

const generateWallet = (req, res) => {

  /**
   * becareful if you need to use it in production !!!
   * @dev - generate random buffer
   * create an instance based on a new random key (setting icap to true will generate an address suitable for the ICAP Direct mode)
   * See more https://github.com/ethereumjs/ethereumjs-icap
  */
  var bufferKey = etherwallet.generate().getPrivateKey();
  var wallet = etherwallet.fromPrivateKey(bufferKey);

  var privkey = wallet.getPrivateKey().toString('hex');
  var addr = wallet.getAddress().toString('hex');

  res.status(httpStatus.ACCEPTED).json({
    privkey_buffer: privkey,
    address_buffer: addr
  });
}

const getAddressBalance = (req, res) => {
    web3.eth.getBalance(req.params.address, (err, result) => {
      var balance = parseFloat(web3.fromWei(result,'ether'));
      if (!err) {
        res.status(httpStatus.OK).json({
          balance: balance
        });
      }
  });
}

module.exports = {
  generateWallet,
  getAddressBalance
};