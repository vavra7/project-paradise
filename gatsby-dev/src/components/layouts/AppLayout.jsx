import React, { Component } from 'react';
import PropTypes from 'prop-types';
import scopedStyles from './AppLayout.module.scss';

import MobileBottomMenu from '../menus/MobileBottomMenu';

class AppLayout extends Component {
	constructor(props) {
		super(props);
		this.state = {
			openRightBar: false
		};

		this.toggleRightBar = this.toggleRightBar.bind(this);
	}

	toggleRightBar() {
		if (!this.state.openRightBar) {
			this.openRightBar();
		} else {
			this.closeRightBar();
		}
	}

	openRightBar() {
		console.log('open');
		this.setState({ openRightBar: true });
	}

	closeRightBar() {
		console.log('close');
		this.setState({ openRightBar: false });
	}

	render() {
		return (
			<div id="app-layout">
				<i className="icon-bars p-fixed ma-3" onClick={this.toggleRightBar}></i>

				<div id="app-layout-content-wrapper" className={scopedStyles.contentWrapper}>
					{this.props.children}
				</div>

				<div id="fixed-right-bar" className={`${scopedStyles.fixedRightBar} p-fixed d-flex`}>
					<div className={`${scopedStyles.rightBarHandlerContainer} p-absolute`}></div>

					<div className={`${scopedStyles.rightBarContentContainer} fg-1`}></div>
				</div>

				<div
					id="fixed-bottom-bar"
					className={`${scopedStyles.fixedBottomBar} p-fixed d-flex jc-flex-end fd-column bg-white shadow-t-3 line-t-2`}
				>
					<MobileBottomMenu />
				</div>
			</div>
		);
	}
}

AppLayout.propTypes = {
	children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element]).isRequired
};

export default AppLayout;
