import { TAGS } from './types';

const initialState = {
	data: []
};

const tagsReducer = (state = initialState, action) => {
	switch (action.type) {
		case TAGS.SET_DATA:
			return {
				...state,
				data: action.payload
			};

		default:
			return state;
	}
};

export default tagsReducer;
