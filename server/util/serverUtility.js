const winston = require('winston');
const appSettings = require('../../config/app_settings.json');

// Set a default logging level;
winston.level = appSettings.logOptions.level;

// If we have a log file, remove the console log and only log to the file
if (appSettings.logOptions.filename.length > 0) {
    // Add the file logging and send in the options from the settings file
    winston.add(winston.transports.File, appSettings.logOptions);
    winston.remove(winston.transports.Console);
} else {
    // Otherwise if filename is empty, restart the console log with our log options.
    winston.remove(winston.transports.Console);
    winston.add(winston.transports.Console, appSettings.logOptions);
}


module.exports = {
    ERROR: 'error',
    WARN: 'warn',

    /**
     * Convert an error into a standard return status object
     * @param message the user friendly error message
     * @param detailMessage the technical error message
     * @param the error from the service call
     * @param the severity of the message (error, warn) (USE CONSTANTS ABOVE)
     * @returns {{serviceFailure: true, message: '<Status message>'}}
     */
    parseServiceErrorStatus: function (message, detailMessage, error, severity) {
        let errorStr = error;
        // If it's not a string, turn it into one
        if (!error.substring) {
            errorStr = JSON.stringify(error);
        }

        return {
            status: {
                serviceFailure: true,
                message: message,
                detailMessage: detailMessage,
                error: errorStr,
                severity: severity
            }
        };
    },

    /**
     * Convert the service status message into a standard return status object
     * @param message the message from the service call
     * @returns {{serviceFailure: false, message: '<Status message>'}}
     */
    parseServiceSuccessStatus: function (message) {
        return {
            serviceFailure: false,
            message: message
        }
    }
}
