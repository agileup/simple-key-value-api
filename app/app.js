const express = require('express')
const path = require('path');

const logger = require(path.resolve('lib/logger'));

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

app.get('/', (req, res) => res.send('Hello World!'))

app.use( (err, req, res, next) => {
    logger.error('error', err);

    res.status(err.status || 500);
    res.send(err.showMessage ? err.message : 'error');
});

module.exports = app;
