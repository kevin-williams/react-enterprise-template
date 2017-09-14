import React from 'react';
import { render } from 'react-dom';

import Detail from 'containers/detail/Detail';
import Header from 'containers/header/Header';
import Main from 'containers/main/Main';

import { BrowserRouter as Router, Route } from 'react-router-dom';

render(
    <Router>
        <div>
            <Route component={Header}/>
            <Route exact path='/' component={Main}/>
            <Route path='/detail' component={Detail}/>
        </div>
    </Router>,
    document.getElementById('app')
);

