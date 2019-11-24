import React from 'react';
import { event } from '../../events';
import { EVENTS } from '../../events/types';

const toggleFixedRightBar = () => {
	event.emit(EVENTS.FIXED_BARS.RIGHT_BAR_TOGGLE);
};

function MobileTopMenu() {
	return (
		<nav>
			<i className="icon-bars" onClick={() => toggleFixedRightBar()}></i>
		</nav>
	);
}

export default MobileTopMenu;
