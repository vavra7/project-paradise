import { REQUESTS } from './types';

const requestSent = data => ({
	type: REQUESTS.REQUEST_SENT,
	payload: data
});

const requestSuccess = data => ({
	type: REQUESTS.REQUEST_SUCCESS,
	payload: data
});

const requestError = data => ({
	type: REQUESTS.REQUEST_ERROR,
	payload: data
});

export { requestSent, requestSuccess, requestError };
