import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import Location from 'containers/location/Location';
import Header from 'containers/header/Header';
import Main from 'containers/main/Main';
import store from 'store/reduxStore';

import { BrowserRouter as Router, Route } from 'react-router-dom';

render(
    <Provider store={store}>
        <Router>
            <div>
                <Route component={Header}/>
                <Route exact path='/' component={Main}/>
                <Route path='/location' component={Location}/>
            </div>
        </Router>
    </Provider>,
    document.getElementById('app')
);

