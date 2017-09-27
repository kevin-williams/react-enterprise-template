const winston = require('winston');
const appSettings = require('../../config/app_settings.json');

// Set the logging level from the config when the server starts;
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
    ERROR: 'error',  // Constants for severity in status message
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

        winston.error('parseServiceErrorStatus Error:' + typeof error);

        // If it's an object, turn it into a string
        if (typeof error === 'object') {
            if (error.response) {
                errorStr = `${error.response.status} - ${error.response.statusText}`;
            } else {
                errorStr = '';
            }
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
