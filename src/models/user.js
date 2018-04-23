const mongoose = require('mongoose');

var Wallet = new mongoose.Schema({
  domain: mongoose.Schema.Types.String,
  callback_path: mongoose.Schema.Types.String,
});