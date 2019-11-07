import { ACTIONS } from './types';

export const appWidthHeight = (width, height) => ({
	type: ACTIONS.APP.WIDTH_HEIGHT,
	payload: { width, height }
});