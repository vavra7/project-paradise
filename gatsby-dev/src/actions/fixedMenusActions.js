import { TYPES } from './types';

export const rightBarOpen = open => ({
	type: TYPES.FIXED_MENUS.RIGHT_BAR_OPEN,
	payload: open
});

export const rightBarSetProgress = (manual, auto, directionOpen, open) => ({
	type: TYPES.FIXED_MENUS.PROGRESS,
	payload: { manual, auto, directionOpen, open }
});
