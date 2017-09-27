import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import Location from 'containers/location/Location';
import Header from 'containers/header/Header';
import Homepage from 'containers/homepage/Homepage';
import store from 'store/reduxStore';

import { BrowserRouter as Router, Route } from 'react-router-dom';

/**
 * Set up the redux store for the app.
 *
 * Set up the main react-router routes for the app.   As of react-router v4, Routes can be nested throughout the app.
 */
render(
    <Provider store={store}>
        <Router>
            <div>
                <Route component={Header}/>
                <Route exact path='/' component={Homepage}/>
                <Route path='/location' component={Location}/>
            </div>
        </Router>
    </Provider>,
    document.getElementById('app')
);

