import { ACTIONS } from '../actions/types';

const initialState = {
	postsPerPage: 10
};

const settingsReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTIONS.SETTINGS.SET_POSTS_PER_PAGE:
			return { ...state, ...{ postsPerPage: action.payload } };
		default:
			return state;
	}
};

export default settingsReducer;
