
const express = require('express');
const httpStatus = require('http-status');
const ethereumWallet = require('./ethereum');

const router = express.Router(); // eslint-disable-line new-cap

// ethereum
router.get('/createwallet/eth', ethereumWallet.generateWallet);
router.get('/balance/:address', ethereumWallet.getAddressBalance);

module.exports = router;