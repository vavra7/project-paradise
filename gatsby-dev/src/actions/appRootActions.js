import { ACTIONS } from './types';

export const appWidthHeight = (width, height) => ({
	type: ACTIONS.APP.WIDTH_HEIGHT,
	payload: { width, height }
});

export const appSwipeAxis = (x, y) => ({
	type: ACTIONS.APP.SWIPE_AXIS,
	payload: { x, y }
});
