import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import styles from './Main.scss';

const mapStateToProps = (state) => state;

@connect(mapStateToProps)
export default class Main extends Component {

    render() {

        return (
            <div className='main-body'>

                <ul>
                    <li>
                        <Link to='/location'>Set Location</Link>
                    </li>
                </ul>
            </div>
        );
    }

}
