
export const DEFAULT_SERVICE_STATUS = { serviceFailure: null, message: '' }


export const getUrlParam = (paramName) => {
	let paramValue;
	const paramIdx = window.location.search.indexOf(paramName);
	
	if (paramIdx > -1) {
		paramValue = window.location.search.slice(paramIdx).split('&')[ 0 ].split('=')[ 1 ];
		paramValue = decodeURI(paramValue);
	}
	return paramValue;
}

/**
 * Convert an error into a standard return status object
 * @param the human friendly error message
 * @param the error from the service call
 * @returns the filled status object
 */
export const parseServiceErrorStatus = (message, error) => (
    {
        serviceFailure: true,
        message: message,
        error: error.substring ? error : JSON.stringify(error),
        severity: ERROR
    }
)
