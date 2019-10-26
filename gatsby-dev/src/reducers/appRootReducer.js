import { TYPES } from '../actions/types';
import { isMobile, detectBrowser } from '../services/appRootServices';

const initialState = {
	isMobile: typeof window !== 'undefined' && isMobile(),
	browser: typeof window !== 'undefined' && detectBrowser(),
	width: typeof window !== 'undefined' ? window.innerWidth : 0,
	height: typeof window !== 'undefined' ? window.innerHeight : 0
};

const appRootReducer = (state = initialState, action) => {
	switch (action.type) {
		case TYPES.APP.WIDTH_HEIGHT:
			return { ...state, ...{ width: action.payload.width, height: action.payload.height } };
		default:
			return state;
	}
};

export default appRootReducer;
