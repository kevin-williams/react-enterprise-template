import React, { Component } from 'react';
import PropTypes from 'prop-types';

import style from './ErrorLine.scss';

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
                //if the type is error then display error message
                if(type === 'error') {
                    errorLine = <div className="myapp-error-line" id="auto-error-message"><span
                    className="myapp-error-line__image"
                                                                                        ><img
                    src="images/error_icon_thin.png"
                                                                                        /></span>{ status.message } </div>;
                }
                //if the type is warn then display warning message 
                else {
                   errorLine = <div className="myapp-warn-line" id="auto-warn-message"><span
                    className="myapp-warn-line__image"
                                                                                     ><img
                    src="images/warning_icon_thin.png"
                                                                                     /></span>{ status.message } </div>;
                }
             
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
    statusList: PropTypes.array
}