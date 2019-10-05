import React from 'react';
import scopedStyles from './AppLayout.module.scss';

import MobileBottomMenu from '../menus/MobileBottomMenu';

const AppLayout = ({ children }) => (
	<div id="app-layout">
		<div id="app-layout-content-wrapper" className={scopedStyles.contentWrapper}>
			{children}
		</div>

		<div id="fixed-right-bar" className={`${scopedStyles.fixedRightBar} p-fixed d-flex`}>
			<div className={scopedStyles.rightBarHandlerContainer}>handler</div>

			<div className={`${scopedStyles.rightBarContentContainer} fg-1`}>content</div>
		</div>

		<div
			id="fixed-bottom-bar"
			className={`${scopedStyles.fixedBottomBar} p-fixed d-flex jc-flex-end fd-column bg-white shadow-t-3 line-t-2`}
		>
			<MobileBottomMenu />
		</div>
	</div>
);

export default AppLayout;
