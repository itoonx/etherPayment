const mongoose = require('mongoose');

var Domain = new mongoose.Schema({
  domain: mongoose.Schema.Types.String,
  registed: mongoose.Schema.Types.Date,
  callback_path: mongoose.Schema.Types.String
});

