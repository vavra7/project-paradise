import { APP_ROOT } from './types';

const setAppWidthHeight = (width, height) => ({
	type: APP_ROOT.SET_WIDTH_HEIGHT,
	payload: { width, height }
});

const setScrollEnabled = enabled => ({
	type: APP_ROOT.SET_SCROLL_ENABLED,
	payload: { enabled }
});

export { setAppWidthHeight, setScrollEnabled };
