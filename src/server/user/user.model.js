const mongoose = require('mongoose');

var User = new mongoose.Schema({
  domain: mongoose.Schema.Types.String,
  registed: mongoose.Schema.Types.Date,
  callback_path: mongoose.Schema.Types.String
});

