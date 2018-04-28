
const etherwallet = require('ethereumjs-wallet');
const httpStatus = require('http-status');
const WalletModel = require('../wallet.model');

const APIError = require('../../../helpers/APIError');
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

  // store address to the server
  var createNewWallet = new WalletModel({
    uid: 1,
    address: addr,
    currency_type: "ETH",
    transactions_count: 0,
    nonce: 0
  });

  createNewWallet.save((err, resp) => {
    if (err) new APIError(err);
    res.status(httpStatus.ACCEPTED).json({
      privkey_buffer: privkey,
      address_buffer: addr
    });
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

const addAddress = (req, res) => {

  var addNewWallet = new WalletModel({
    uid: 1,
    address: req.params.address,
    currency_type: req.params.currency_type, // Example ETH, OMG,
    transactions_count: 0,
    nonce: 0
  });

  addNewWallet.save((err, resp) => {
    if (err) new APIError(err);
    res.status(httpStatus.ACCEPTED).json({
      address: req.params.address,
      msg: "Wallet address has been added"
    });
  });
}

const listAddress = (req, res) => {

  var query = {}
  var userId;

  if (!req.params.user_id || req.params.user_id == 'undefined') {
    userId = 1
  } else {
    userId = req.params.user_id
  }

  if (!req.params.currency_type || req.params.currency_type == 'undefined') {
    query = { uid: userId }
  } else {
    query = {
      uid: userId,
      currency_type: req.params.currency_type
    }
  }

  WalletModel.find(query, (err, resp) => {
    if (err) new APIError(err);
    res.status(httpStatus.OK).json({
      addresses: resp
    });
  })
}

const deleteAddress = (req, res) => {
  WalletModel.findByIdAndRemove(req.params.id, (err, resp) => {
    if (err) new APIError(err);
    res.status(httpStatus.OK).json({
      address: resp
    });
  });
}

/** Use for develop only, 
 * Beware someone else can destroy your wallet from here !
 */
const deleteAllAddress = (req, res) => {
  WalletModel.find({}).remove((err, resp) => {
    if (err) new APIError(err);
    res.status(httpStatus.OK).json({
      address: resp,
      msg: "All addresess has been destroy"
    });
  });
}

module.exports = {
  generateWallet,
  getAddressBalance,
  listAddress,
  addAddress,
  deleteAddress,
  deleteAllAddress
};