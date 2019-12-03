const express = require('express')
const path = require('path');

const logger = require(path.resolve('lib/logger'));
const responseJSON = require(path.resolve('lib/responseJSON'));

const app = express();

app.use(require('morgan')('combined', {
    'stream': {
        write: (message, encoding) => {
            logger.info(message);
        }
    }
}));

app.use(express.urlencoded({ 'extended': 'true' }));
app.use(express.json());

app.use('/', require(path.resolve('routes')));

app.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    
    responseJSON(res, err);
});

module.exports = app;
