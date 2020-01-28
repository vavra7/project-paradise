import { REQUESTS } from './types';

const apiReducer = (state = {}, action) => {
	switch (action.type) {
		case REQUESTS.REQUEST_SENT:
			return {
				...state,
				[action.payload.requestId]: {
					pending: true,
					error: ''
				}
			};

		case REQUESTS.REQUEST_SUCCESS:
			return {
				...state,
				[action.payload.requestId]: {
					pending: false,
					error: ''
				}
			};

		case REQUESTS.REQUEST_ERROR:
			return {
				...state,
				[action.payload.requestId]: {
					pending: false,
					error: action.payload.error
				}
			};

		default:
			return state;
	}
};

export default apiReducer;
