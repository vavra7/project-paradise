import { ACTIONS } from '../actions/types';

const initialState = {
	rightBarIsActive: false
};

const fixedBarsReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTIONS.FIXED_BARS.RIGHT_BAR_ACTIVE:
			return {
				...state,
				rightBarIsActive: action.payload.active
			};
		default:
			return state;
	}
};

export default fixedBarsReducer;