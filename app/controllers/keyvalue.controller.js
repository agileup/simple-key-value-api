const path = require('path');

const logger = require(path.resolve('lib/logger'));
const responseJSON = require(path.resolve('lib/responseJSON'));

const keyValueService = require(path.resolve('app/services/keyvalue.service'));

/**
 * Get value by key
 *
 * GET /object/:key
 */
exports.get = function(req, res) {
  // TODO: validate param
  const params = {
    key: req.params.key,
    timestamp: req.query.timestamp,
  };
  keyValueService.get(params, responseJSON.callback(res));
};

/**
 * Create key-value pair
 * 
 * POST /object
 */
exports.create = function(req, res) {
  // TODO: refactoring with express-validator module
  const [key, value] = Object.entries(req.body)[0];
  if (!key || typeof key !== "string") {
    const err = new Error();
    err.status = 400;
    throw err;
  }
  if (typeof value !== 'string' && typeof value !== 'object') {
    const err = new Error('Value type should be string or object')
    err.status = 400;
    throw err;
  }

  const params = {
    key,
    value,
  }
  keyValueService.create(params, responseJSON.callback(res));
};

/**
 * Get all key-value pairs
 * 
 * GET /object
 */
exports.list = function(req, res) {
  const { limit = 0, skip = 0 } = req.query;
  const params = {
    limit: parseInt(limit),
    skip: parseInt(skip),
  };
  keyValueService.list(params, responseJSON.callback(res));
};
