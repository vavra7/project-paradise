import { API } from './types';

const requestSent = data => ({
	type: API.REQUEST_SENT,
	payload: data
});

const requestSuccess = data => ({
	type: API.REQUEST_SUCCESS,
	payload: data
});

const requestError = data => ({
	type: API.REQUEST_ERROR,
	payload: data
});

export { requestSent, requestSuccess, requestError };
