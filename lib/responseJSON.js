const path = require('path');

const logger = require(path.resolve('lib/logger'));

/**
 * Build & send JSON response
 *
 * @param {Response} res
 * @param {Object|Error} data
 */
var responseJSON = (res, data) => {
    let status = res.statusCode;
    let body = data || {};

    if (data instanceof Error) {
        if (data.status) {
            status = data.status;
            body = {
                message: data.message || '',
            };
        } else {
            logger.error('uncaught response error>', data);
            status = 500;
            body = {
                message: 'Internal Server Error'
            }
        }
    }

    res.status(status).jsonp(body);
};

module.exports = exports = responseJSON;

/**
 * Wrapper for responseJSON
 *
 * @param {http.ServerResponse} res
 * @param {object} predefinedData
 * @returns {function}
 */
exports.callback = (res, predefinedData) => {
    return (err, result) => {
        const data = err || predefinedData || result;
        responseJSON(res, data);
    };
};
