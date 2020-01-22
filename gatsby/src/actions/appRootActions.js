import { ACTIONS } from './types';

export const setAppWidthHeight = (width, height) => ({
	type: ACTIONS.APP_ROOT.SET_WIDTH_HEIGHT,
	payload: { width, height }
});

export const setScrollEnabled = (enabled) => ({
	type: ACTIONS.APP_ROOT.SET_SCROLL_ENABLED,
	payload: { enabled }
});