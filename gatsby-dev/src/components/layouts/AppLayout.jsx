import React from 'react';
import scopedStyles from './AppLayout.module.scss';

import MobileBottomMenu from '../menus/MobileBottomMenu';

const AppLayout = ({ children }) => (
	<div id="app-layout">
		<div id="fixed-right-bar" className={scopedStyles.fixedRightBar}>
			right bar
		</div>

		<div id="app-layout-content-wrapper" className={scopedStyles.contentWrapper}>
			{children}
		</div>

		<div id="fixed-bottom-bar" className={`${scopedStyles.fixedBottomBar} shadow-t-3 line-t-2`}>
			<MobileBottomMenu />
		</div>
	</div>
);

export default AppLayout;
