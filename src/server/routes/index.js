
const express = require('express');
const httpStatus = require('http-status');

const router = express.Router(); // eslint-disable-line new-cap

/** GET /info - Get Information of server */
router.get('/info', (req, res) =>
  res.status(httpStatus.OK).json({ status: 'ok', time: new Date() })
);

module.exports = router;