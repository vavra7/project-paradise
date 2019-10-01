import React from 'react';
import scopedStyles from './AppLayout.module.scss'

const AppLayout = ({ children }) => (
	<div id="app-layout">
		<div id="fixed-top-bar" className={scopedStyles.fixedTopBar}>top bar</div>
		<div id="fixed-right-bar" className={scopedStyles.fixedRightBar}>right bar</div>
		<div id="app-layout-content-wrapper">{children}</div>
		<div id="fixed-bottom-bar" className={scopedStyles.fixedBottomBar}>bottom bar</div>
	</div>
);

export default AppLayout;
