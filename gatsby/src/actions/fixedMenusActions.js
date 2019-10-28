import { ACTIONS } from './types';

export const rightBarSetActive = active => ({
	type: ACTIONS.FIXED_MENUS.RIGHT_BAR_ACTIVE,
	payload: { active }
});
