import { APP_ROOT } from './types';

export const setAppWidthHeight = (width, height) => ({
	type: APP_ROOT.SET_WIDTH_HEIGHT,
	payload: { width, height }
});

export const setScrollEnabled = (enabled) => ({
	type: APP_ROOT.SET_SCROLL_ENABLED,
	payload: { enabled }
});