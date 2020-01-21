import { ACTIONS } from './types';

export const appWidthHeight = (width, height) => ({
	type: ACTIONS.APP_ROOT.WIDTH_HEIGHT,
	payload: { width, height }
});