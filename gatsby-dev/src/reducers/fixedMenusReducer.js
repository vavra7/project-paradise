import { ACTIONS } from '../actions/types';

const initialState = {
	rightBarIsActive: false
};

const fixedMenusReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTIONS.FIXED_MENUS.RIGHT_BAR_ACTIVE:
			return {
				...state,
				rightBarIsActive: action.payload.active
			};
		default:
			return state;
	}
};

export default fixedMenusReducer;
