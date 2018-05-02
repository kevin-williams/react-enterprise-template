import axios from 'axios';
import * as c from './locationConstants';
import { DEFAULT_SERVICE_STATUS } from '../../utils';

export const updateZip = zipCode => dispatch => {
  console.log('calling getZipCode with zipCode=', zipCode);
  if (zipCode.length < 5) {
    dispatch({
      type: c.GET_ZIP_SUCCESS,
      zipCode: zipCode,
      city: '',
      state: '',
      latitude: 0,
      longitude: 0,
      status: DEFAULT_SERVICE_STATUS,
    });

    return;
  }

  axios
    .get('/api/location/' + zipCode)
    .then(resp => {
      if (resp.data && !resp.data.status.serviceFailure) {
        dispatch({
          type: c.GET_ZIP_SUCCESS,
          zipCode: zipCode,
          city: resp.data.zipCode['place name'],
          state: resp.data.zipCode.state,
          latitude: resp.data.zipCode.latitude,
          longitude: resp.data.zipCode.longitude,
          status: resp.data.status,
        });
      } else {
        dispatch({ type: c.GET_ZIP_FAILURE, zipCode: '', status: resp.data.status });
      }
    })
    .catch(error => {
      dispatch({
        type: c.GET_ZIP_FAILURE,
        zipCode: '',
        status: parseServiceErrorStatus('Error looking up zip code', error),
      });
    });
};
