const axios = require('axios');
const winston = require('winston');

const appSettings = require('../../config/app_settings.json');
const util = require('../util/serverUtility');

/**
 * Controller for handling all location calls through the server side.
 * @type {{getZipCode: module.exports.getZipCode}} - the getZipCode method
 */
module.exports = {
    getZipCode: async function (request, response) {
        winston.verbose('locationController-getZipCode');

        try {
            const { zipCode } = request.params;

            let zipUrl = appSettings.service_endpoints.ZIP_CODE + zipCode;
            winston.debug('\tcalling out to ' + zipUrl);
            let zipResult = await axios.get(zipUrl);
            let zipInfo = zipResult.data;

            winston.debug('\tzipInfo=', zipInfo);

            if (zipInfo && zipInfo.places.length && zipInfo.places.length > 0) {
                /**
                 * Always include a status object in the return value.
                 * Makes it easy to see what happened from the client side.  Also can make errors automatic too!
                 */
                response.json(
                    {
                        status: util.parseServiceSuccessStatus('success'),
                        zipCode: zipInfo.places[0]
                    });
            } else {
                response.json(
                    {
                        status: util.parseServiceSuccessStatus('no results found')
                    }
                )
            }

        } catch(error) {
            /**
             * Catch the error and log it.
             * Then send back a status object including information about the error.
             */
            winston.error('/api/location error=', error);
            response.json(util.parseServiceErrorStatus('Error looking up location', 'Caught error from call', error, util.ERROR));
        };

    }
}