import * as c from './locationConstants';

// updateZip action will post the GET_ZIP action to redux
export const updateZip = zipCode => ({
  type: c.GET_ZIP,
  zipCode,
});
