import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import styles from './Homepage.scss';

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
            </div>
        );
    }

}
