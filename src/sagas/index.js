import * as location from '../containers/location/locationSaga';

/*
 index starts the saga watchers
 */
export default function* rootSaga() {
    yield [
        location.watchUpdateZip(),
    ]
}
