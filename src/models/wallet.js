const mongoose = require('mongoose');

var Wallet = new mongoose.Schema({
  uid: mongoose.Schema.Types.String,
  address: mongoose.Schema.Types.String,
  currency_type: mongoose.Schema.Types.Number,
  transactions_count: mongoose.Schema.Types.Number,
  nonce: mongoose.Schema.Types.Number
});