const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * keyValue schema
 */
const keyValueSchema = new mongoose.Schema({
  key: { type: String, required: true },
  value: { type: Schema.Types.Mixed, required: true },
  timestamp: { type : Date, default: Date.now },
}, {
  timestamps: true,
});

keyValueSchema.options.toObject = keyValueSchema.options.toJSON = {
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.__v;
    delete ret.createdAt;
    delete ret.updatedAt;
  }
};

/**
 * @param {string} params.key
 * @param {number} [params.timestamp]
 */
keyValueSchema.statics.findOneByKey = function(params, callback) {
  const lastTime = params.timestamp ? new Date(params.timestamp * 1000) : new Date();
  const conditions = {
    key: params.key,
    timestamp: {
      $lte: lastTime
    },
  };
  const options = {
    sort: { timestamp: -1 },
  };
  this.findOne(conditions, null, options, callback);
};

/**
 * @param {number} [params.skip]
 * @param {number} [params.limit]
 */
keyValueSchema.statics.list = function(params, callback) {
  const options = {
    sort: { _id: -1 },
    skip: params.skip || 0,
    limit: params.limit || 50,
  };
  this.find(null, null, options, callback);
};

module.exports = mongoose.model('KeyValue', keyValueSchema);
