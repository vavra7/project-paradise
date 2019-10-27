import { TYPES } from './types';

export const appWidthHeight = (width, height) => ({
	type: TYPES.APP.WIDTH_HEIGHT,
	payload: { width, height }
});

export const appSwipeAxis = (x, y) => ({
	type: TYPES.APP.SWIPE_AXIS,
	payload: { x, y }
});
