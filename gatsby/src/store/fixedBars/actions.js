import { FIXED_BARS } from './types';

const setRightBarEnabled = enabled => ({
	type: FIXED_BARS.SET_RIGHT_BAR_ENABLED,
	payload: { enabled }
});
const setMobileTopBarEnabled = enabled => ({
	type: FIXED_BARS.SET_MOBILE_TOP_BAR_ENABLED,
	payload: { enabled }
});
const setRightBarActive = active => ({
	type: FIXED_BARS.SET_RIGHT_BAR_ACTIVE,
	payload: { active }
});
const setBottomBarEnabled = enabled => ({
	type: FIXED_BARS.SET_BOTTOM_BAR_ENABLED,
	payload: { enabled }
});

export { setRightBarEnabled, setMobileTopBarEnabled, setRightBarActive, setBottomBarEnabled };
