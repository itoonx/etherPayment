
const express = require('express');
const httpStatus = require('http-status');
const ethereumWallet = require('./ethereum');

const router = express.Router(); // eslint-disable-line new-cap

// ethereum
router.post('/createwallet/eth', ethereumWallet.generateWallet);
router.get('/balance/:address', ethereumWallet.getAddressBalance);
router.get('/list/:currency_type?/:user_id?', ethereumWallet.listAddress);
router.post('/add', ethereumWallet.addAddress);
router.delete('/', ethereumWallet.deleteAddress);
router.delete('/all', ethereumWallet.deleteAllAddress);

module.exports = router;