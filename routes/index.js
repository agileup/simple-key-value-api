const express = require('express');
const path = require('path');

const router = express.Router();

router.use('/object', require(path.resolve('routes/keyvalue.routes')));

module.exports = router;
