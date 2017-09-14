import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// import { connect } from 'react-redux';

import styles from './Main.scss';

// const mapStateToProps = (state) => state;

// @connect(mapStateToProps)
export default class Main extends Component {

    render() {

        return (
            <div className='main-body'>
                <ul>
                    <li>
                        <Link to='/detail'>Press 1</Link>
                    </li>
                    <li>
                        <Link to='/detail'>Press 2</Link>
                    </li>
                </ul>
            </div>
        );
    }

}
