import { REQUEST } from './types';

const apiReducer = (state = {}, action) => {
	switch (action.type) {
		case REQUEST.SENT:
			return {
				...state,
				[action.payload.requestId]: {
					pending: true,
					error: ''
				}
			};

		case REQUEST.SUCCESS:
			return {
				...state,
				[action.payload.requestId]: {
					pending: false,
					error: ''
				}
			};

		case REQUEST.ERROR:
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
