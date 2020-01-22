import { ACTIONS } from '../actions/types';
import { isMobile, detectDesktopBrowser, detectMobileBrowser } from '../services/appRootServices';

const initialState = {
	isMobile: typeof window !== 'undefined' && isMobile(),
	browser: {
		desktop: typeof window !== 'undefined' && detectDesktopBrowser(),
		mobile: typeof window !== 'undefined' && detectMobileBrowser()
	},
	width: typeof window !== 'undefined' ? window.innerWidth : 0,
	height: typeof window !== 'undefined' ? window.innerHeight : 0,
	scrollEnabled: true
};

const appRootReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTIONS.APP_ROOT.SET_WIDTH_HEIGHT:
			return { ...state, ...{ width: action.payload.width, height: action.payload.height } };
		case ACTIONS.APP_ROOT.SET_SCROLL_ENABLED:
			return { ...state, scrollEnabled: action.payload.enabled };
		default:
			return state;
	}
};

export default appRootReducer;
