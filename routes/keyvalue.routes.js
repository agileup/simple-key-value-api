const express = require('express');
const path = require('path');

const keyValueController = require(path.resolve('app/controllers/keyvalue.controller'));

const router = express.Router();

router.route('/')
  .post(keyValueController.create)
  .get(keyValueController.list);

router.route('/:key')
  .get(keyValueController.get);

module.exports = router;
