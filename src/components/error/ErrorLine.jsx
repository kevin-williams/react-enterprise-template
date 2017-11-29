import React, { Component } from 'react';
import PropTypes from 'prop-types';

import style from './ErrorLine.scss';

const ERROR_IMG = 'images/error_icon_thin.png';
const WARN_IMG = 'images/warning_icon_thin.png';

/**
 * Takes a list of status objects and shows the first one with an error.  If no errors, render null
 */
export default class ErrorLine extends Component {
  render() {
    let errorLine = null;
    if (this.props.statusList.length > 0) {
      // Only show the first error in the list
      for (let i = 0; i < this.props.statusList.length; i++) {
        let status = this.props.statusList[i];
        let type = this.props.severity;

        if (!status || !status.serviceFailure) {
          // Skip if not a failure
          continue;
        }

        let imageURL = type === 'error' ? ERROR_IMG : WARN_IMG;
        let typeClassName = type === 'error' ? 'einvoice-error-line-error' : 'einvoice-error-line-warn';

        errorLine = (
          <div className={'app-error-line ' + typeClassName} id="auto-error-message">
            <img src={imageURL} className="app-error-line__image" />
            <span>
              <div>{status.message}</div>
              <div>{status.detailMessage}</div>
            </span>
          </div>
        );

        if (status.serviceFailure == null) {
          // service not called yet
          errorLine = null;
        } else if (status.message == 'success') {
          // No error on a successful call
          errorLine = null;
        }

        if (errorLine !== null) {
          break;
        }
      }
    }

    return errorLine;
  }
}

ErrorLine.propTypes = {
  statusList: PropTypes.array,
};
