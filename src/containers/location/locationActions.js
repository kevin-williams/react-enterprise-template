import * as c from './locationConstants';

export const updateZip = (zipCode) => ({
    type: c.GET_ZIP, zipCode
});
