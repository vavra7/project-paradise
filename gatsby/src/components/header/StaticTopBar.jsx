import React from 'react';
import scopedStyles from './StaticTopBar.module.scss';
import Logo from '../commons/logo/Logo';

function StaticTopBar() {
	return (
		<div id="static-top-bar" className={`${scopedStyles.staticTopBar} container-fluid d-flex ai-center hide-sm-down`}>
			<Logo />
		</div>
	);
}

export default StaticTopBar;
