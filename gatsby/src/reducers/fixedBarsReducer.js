import { ACTIONS } from '../actions/types';

const initialState = {
	rightBarEnabled: true,
	rightBarActive: false
};

const fixedBarsReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTIONS.FIXED_BARS.SET_RIGHT_BAR_ENABLED:
			return {
				...state,
				rightBarEnabled: action.payload.enabled
			};
		case ACTIONS.FIXED_BARS.SET_RIGHT_BAR_ACTIVE:
			return {
				...state,
				rightBarActive: action.payload.active
			};
		default:
			return state;
	}
};

export default fixedBarsReducer;
