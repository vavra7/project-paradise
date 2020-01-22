import { ACTIONS } from './types';

export const setRightBarEnabled = enabled => ({
	type: ACTIONS.FIXED_BARS.SET_RIGHT_BAR_ENABLED,
	payload: { enabled }
});

export const setRightBarActive = active => ({
	type: ACTIONS.FIXED_BARS.SET_RIGHT_BAR_ACTIVE,
	payload: { active }
});
