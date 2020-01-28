import { REQUEST } from './types';

const requestSent = data => ({
	type: REQUEST.SENT,
	payload: data
});

const requestSuccess = data => ({
	type: REQUEST.SUCCESS,
	payload: data
});

const requestError = data => ({
	type: REQUEST.ERROR,
	payload: data
});

export { requestSent, requestSuccess, requestError };
