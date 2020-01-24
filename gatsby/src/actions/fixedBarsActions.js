import { ACTIONS } from './types';

export const setRightBarEnabled = enabled => ({
	type: ACTIONS.FIXED_BARS.SET_RIGHT_BAR_ENABLED,
	payload: { enabled }
});

export const setMobileTopBarEnabled = enabled => ({
	type: ACTIONS.FIXED_BARS.SET_MOBILE_TOP_BAR_ENABLED,
	payload: { enabled }
});

export const setRightBarActive = active => ({
	type: ACTIONS.FIXED_BARS.SET_RIGHT_BAR_ACTIVE,
	payload: { active }
});

export const setBottomBarEnabled = enabled => ({
	type: ACTIONS.FIXED_BARS.SET_BOTTOM_BAR_ENABLED,
	payload: { enabled }
});
