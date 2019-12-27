import React from 'react';
import { event } from '../../events';
import { EVENTS } from '../../events/types';

const toggleFixedRightBar = () => {
	event.emit(EVENTS.FIXED_BARS.RIGHT_BAR_TOGGLE);
};

function MobileTopMenu() {
	return (
		<nav>
			<button onClick={() => toggleFixedRightBar()} style={{ background: 'none', border: 'none' }}>
				<i className="icon-bars"></i>
			</button>
		</nav>
	);
}

export default MobileTopMenu;
