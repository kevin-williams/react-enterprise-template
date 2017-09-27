import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { version } from '../../../package.json';

import styles from './Homepage.scss';

// Take redux state and set it into the component properties for easy access
const mapStateToProps = (state) => state;
@connect(mapStateToProps)

export default class Homepage extends Component {

    render() {

        return (
            <div className='myapp-homepage'>

                <ul>
                    <li>
                        <Link to='/location' className='myapp-homepage__location-link'>Set Location</Link>
                    </li>
                </ul>

                <h3>{version}</h3>
            </div>
        );
    }

}
