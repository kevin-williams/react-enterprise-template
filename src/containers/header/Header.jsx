import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import CityState from '../../components/location/CityState';
import styles from './Header.scss';

const mapStateToProps = state => state;

@connect(mapStateToProps)
export default class Header extends Component {
  render() {
    return (
      <span className="myapp-header">
        <h1>
          TODO - Real Header Here! <CityState location={this.props.location} />
        </h1>
      </span>
    );
  }
}

Header.propTypes = {
  location: PropTypes.object,
};
