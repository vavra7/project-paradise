import { API } from './types';

const apiReducer = (state = {}, action) => {
	switch (action.type) {
		case API.REQUEST_SENT:
			return {
				...state,
				[action.payload.requestId]: {
					pending: true,
					error: ''
				}
			};

		case API.REQUEST_SUCCESS:
			return {
				...state,
				[action.payload.requestId]: {
					pending: false,
					error: ''
				}
			};

		case API.REQUEST_ERROR:
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
