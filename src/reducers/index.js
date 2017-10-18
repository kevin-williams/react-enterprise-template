import { combineReducers } from 'redux';
import locationReducer from 'containers/location/locationReducer';

// this appends all the sub reducers with these names for the root reducer
export default combineReducers({
  location: locationReducer,
});
