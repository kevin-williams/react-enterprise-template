import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from 'reducers';
import rootSaga from 'sagas';

const sagaMiddleware = createSagaMiddleware();

/**
 * This will take the root reducer and register it in the data store.   The heirarchy is created based on the root reducer.
 *
 * It then uses the saga middleware to help manage the actions posted to redux.
 */
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

// Register the sagas to the middleware so they fire
sagaMiddleware.run(rootSaga);

export default store;
