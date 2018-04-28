
const mongoose = require('mongoose');

var WalletSchema = new mongoose.Schema({
  uid: mongoose.Schema.Types.Number,
  domain_id: mongoose.Schema.Types.Number,
  address: mongoose.Schema.Types.String,
  currency_type: mongoose.Schema.Types.String,
  transactions_count: mongoose.Schema.Types.Number,
  nonce: mongoose.Schema.Types.Number
});

var Wallet = mongoose.model('Wallet', WalletSchema);

module.exports = Wallet;
