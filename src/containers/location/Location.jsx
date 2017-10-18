import React, { Component } from 'react';
import { connect } from 'react-redux';

import ErrorLine from '../../components/error/ErrorLine';
import ZipCode from '../../components/location/ZipCode';
import { updateZip } from './locationActions';

import styles from './Location.scss';

// Take redux state and set it into the component properties for easy access
const mapStateToProps = state => state;
@connect(mapStateToProps, { updateZip })
export default class Location extends Component {
  render() {
    return (
      <div className="myapp-location">
        <ErrorLine statusList={[this.props.location.zipCodeStatus]} />
        <ZipCode location={this.props.location} updateZip={this.props.updateZip} />
        <button onClick={() => this.props.history.goBack()}>Back</button>
      </div>
    );
  }
}
