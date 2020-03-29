import { APP_ROOT } from './types';
import { isMobile, detectDesktopBrowser, detectMobileBrowser } from '../../services/appRootServices';

const windowExists = typeof window !== 'undefined';

const initialState = {
	isMobile: windowExists && isMobile(),
	browser: {
		desktop: windowExists && detectDesktopBrowser(),
		mobile: windowExists && detectMobileBrowser()
	},
	width: windowExists ? window.innerWidth : 0,
	height: windowExists ? window.innerHeight : 0,
	scrollEnabled: true
};

const appRootReducer = (state = initialState, action) => {
	switch (action.type) {
		case APP_ROOT.SET_WIDTH_HEIGHT:
			return {
				...state,
				...{ width: action.payload.width, height: action.payload.height }
			};

		case APP_ROOT.SET_SCROLL_ENABLED:
			return {
				...state,
				scrollEnabled: action.payload.enabled
			};

		default:
			return state;
	}
};

export default appRootReducer;
