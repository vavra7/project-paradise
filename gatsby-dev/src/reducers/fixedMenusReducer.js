import { TYPES } from '../actions/types';

const initialState = {
	rightBarProgress: {
		manual: false,
		auto: false,
		directionOpen: false,
		open: false
	}
};

const fixedMenusReducer = (state = initialState, action) => {
	switch (action.type) {
		case TYPES.FIXED_MENUS.PROGRESS:
			return {
				...state,
				rightBarProgress: {
					...state.rightBarProgress,
					...{
						manual: action.payload.manual,
						auto: action.payload.auto,
						directionOpen: action.payload.directionOpen,
						open: action.payload.open
					}
				}
			};
		default:
			return state;
	}
};

export default fixedMenusReducer;
