import { FIXED_BARS } from './types';

const initialState = {
	rightBarEnabled: true,
	rightBarActive: false,
	mobileTopBarEnabled: true,
	bottomBarEnabled: true
};

const fixedBarsReducer = (state = initialState, action) => {
	switch (action.type) {
		case FIXED_BARS.SET_RIGHT_BAR_ENABLED:
			return {
				...state,
				rightBarEnabled: action.payload.enabled
			};

		case FIXED_BARS.SET_RIGHT_BAR_ACTIVE:
			return {
				...state,
				rightBarActive: action.payload.active
			};

		case FIXED_BARS.SET_MOBILE_TOP_BAR_ENABLED:
			return {
				...state,
				mobileTopBarEnabled: action.payload.enabled
			};

		case FIXED_BARS.SET_BOTTOM_BAR_ENABLED:
			return {
				...state,
				bottomBarEnabled: action.payload.enabled
			};

		default:
			return state;
	}
};

export default fixedBarsReducer;
