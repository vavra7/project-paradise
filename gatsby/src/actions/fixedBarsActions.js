import { ACTIONS } from './types';

export const rightBarSetActive = active => ({
	type: ACTIONS.FIXED_BARS.RIGHT_BAR_ACTIVE,
	payload: { active }
});
