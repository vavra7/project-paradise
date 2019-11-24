import React from 'react';
import DesktopTopMenu from '../menus/DesktopTopMenu';
import scopedStyles from './MainMenuContainer.module.scss'

function MainMenuContainer() {
	return (
		<div
			id="menu-bar"
			className={`${scopedStyles.mainMenuContainer} container-fluid d-flex jc-center ai-center bg-light-grey hide-sm-down`}
		>
			<DesktopTopMenu />
		</div>
	);
}

export default MainMenuContainer;
