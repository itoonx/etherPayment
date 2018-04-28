
const express = require('express');
const httpStatus = require('http-status');

const walletRouter = require('../wallet/wallet.router');

const router = express.Router(); // eslint-disable-line new-cap

/** GET /info - Get Information of server */
router.get('/info', (req, res) =>
  res.status(httpStatus.OK).json({ status: 'ok', time: new Date() })
);

router.use('/wallet', walletRouter);

module.exports = router;