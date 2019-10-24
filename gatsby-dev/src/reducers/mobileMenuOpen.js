import { TYPES } from '../actions/types'

const initialState = false

const mobileMenuOpenReducer = (state = initialState, action) => {
	switch (action.type) {
		case TYPES.OPEN:
			return {
				open: true,
				inProgress: false
			};
		case TYPES.CLOSE:
			return false;
		default:
			return state;
	}
};

export default mobileMenuOpenReducer;
