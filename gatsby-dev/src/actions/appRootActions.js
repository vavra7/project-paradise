import { TYPES } from './types';

export const appWidthHeight = (width, height) => ({
	type: TYPES.APP.WIDTH_HEIGHT,
	payload: { width, height }
});
