// import npm modules
const express = require('express');
const router = express.Router();
const winston = require('winston');

// import custom modules
const appSettings = require('../config/app_settings.json');


// parse json data passed to node server via routes
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// NOTE: the routes below will be prefixed by /api in the server code

// Return the log file as set up in the appSetting file
router.get('/log', function (request, response) {
    const { level } = request.query;

    // Change the log level
    if (level) {
        winston.level = level;
        winston.error('Set logging level=' + level);
        response.json({ status: 'success', message: 'log level=' + level });
    } else {
        // send the log file back
        if (appSettings.logOptions.filename !== undefined && appSettings.logOptions.filename.length > 0) {
            response.sendFile(appSettings.logOptions.filename);
        } else {
            response.json({
                'error': 'log file not set up properly.  Set the following in the config file.',
                logOptions: {
                    'filename': '<path>'
                }
            })
        }
    }
});

// Send back the config file
router.get('/config', function (request, response) {
    response.json(appSettings);
});

// Send back the config file
router.get('/cache/clear', function (request, response) {
    cache.clear();
    response.json({
        'status': 'The cache has been cleared'
    });
});


module.exports = router;
