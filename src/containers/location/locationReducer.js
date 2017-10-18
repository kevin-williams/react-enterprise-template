import * as c from './locationConstants';
import { DEFAULT_SERVICE_STATUS, getUrlParam } from 'utils';

export const defaultState = {
  zipCode: getUrlParam('zipCode') || '',
  zipCodeStatus: DEFAULT_SERVICE_STATUS,
  city: '',
  state: '',
  latitude: '',
  longitude: '',
};

export default function userReducer(state = defaultState, action) {
  switch (action.type) {
    case c.GET_ZIP_SUCCESS:
      return {
        ...state,
        zipCode: action.zipCode,
        city: action.city,
        state: action.state,
        latitude: action.latitude,
        longitude: action.longitude,
        zipCodeStatus: action.status,
      };
    case c.GET_ZIP_FAILURE:
      return { ...state, zipCodeStatus: action.status };

    default:
      return state;
  }
}
