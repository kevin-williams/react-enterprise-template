import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CityState from './CityState';

import style from './ZipCode.scss';

export default class ZipCode extends Component {

    changeZip = (e) => {
        console.log('calling update zip', e);
        this.props.updateZip(e.target.value);
    }

    render() {
        const { location } = this.props;

        return (
            <div className="myapp-zipcode">
                <h3>Location</h3>
                <input type="text" id="zipcode" value={ location.zipCode } placeholder="Zip Code" onChange={ this.changeZip }/>
                <CityState location={location}/>
            </div>
        )
    }
}

ZipCode.propTypes = {
    location: PropTypes.object,
    updateZip: PropTypes.func
}