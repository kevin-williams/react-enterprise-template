import React, { Component } from 'react';
import PropTypes from 'prop-types';

import style from './CityState.scss';

export default class CityState extends Component {

    render() {
        const { location } = this.props;

        let cityState = null;


        if (location.city) {
            cityState = <span className="myapp-city-state">{ location.city }, { location.state }</span>;
        }


        return cityState;
    }
}

CityState.propTypes = {
    location: PropTypes.object
}