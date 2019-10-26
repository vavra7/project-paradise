import { TYPES } from '../actions/types';

const initialState = {
	width: 10
};

const appRootReducer = (state = initialState, action) => {
	switch (action.type) {
		case TYPES.APP.WIDTH:
			return { ...state, ...{ width: action.payload } };
		default:
			return state;
	}
};

export default appRootReducer;
