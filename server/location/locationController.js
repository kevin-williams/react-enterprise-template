const winston = require('winston');
const axios = require('axios');

const appSettings = require('../../config/app_settings.json');
const util = require('../util/serverUtility');


module.exports = {
    getZipCode: async function (request, response) {
        winston.verbose('locationController-getZipCode');

        try {
            const { zipCode } = request.query;

            let zipUrl = appSettings.service_endpoints.ZIP_CODE + zipCode;
            winston.debug('\tcalling out to ' + zipUrl);
            let zipResult = await axios.get(zipUrl);
            let zipInfo = zipResult.data;

            winston.debug('\tzipInfo=', zipInfo);

            if (zipInfo && zipInfo.places.length && zipInfo.places.length > 0) {
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

            // aws.invokeAWS(INVENTORYLOOKUP, inventoryLookupQuery).then(function (inventoryLookupResponse) {
            //     const { return_message } = inventoryLookupResponse.data.lookupInventoryResponse.return_status;
            //     const inventory = parseProductResults.createInventoryReturnObject(inventoryLookupResponse.data);
            //     const status = util.parseServiceSuccessStatus(return_message, inventory.length)
            //     response.json({ status: status, inventory: inventory });
        } catch(error) {
            winston.error('/api/location error=', error);
            response.json(util.parseServiceErrorStatus('Error looking up location', error));
        };

    }
}