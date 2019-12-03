const path = require('path');

const keyValueModel = require(path.resolve('app/models/keyvalue.model'));

/**
 * @param {string} params.key
 * @param {timestamp} [params.timestamp]
 */
exports.get = function(params, callback) {
  console.log(params);
  keyValueModel.findOneByKey(params, callback);
};

/**
 * @param {string} params.key
 * @param {string|json} params.value
 */
exports.create = function(params, callback) {
  const keyvalue = new keyValueModel();
  keyvalue.key = params.key;
  keyvalue.value = params.value;
  keyvalue.save((err) => {
    callback(err, keyvalue);
  });
};

/**
 * @param {number} params.skip
 * @param {number} params.limit
 */
exports.list = function(params, callback) {
  keyValueModel.list(params, callback);
};
