import React, { Component } from 'react';
import PropTypes from 'prop-types';
import scopedStyles from './AppLayout.module.scss';
import { tween, easing, styler } from 'popmotion';
import MobileBottomMenu from '../menus/MobileBottomMenu';

class AppLayout extends Component {
	constructor(props) {
		super(props);
		this.state = {
			openRightBar: false
		};
		this.fixedRightBar = React.createRef();
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
		console.log(styler(this.fixedRightBar.current).get('x') ? styler(this.fixedRightBar.current).get('x') : '0%');

		tween({
			from: {
				x: styler(this.fixedRightBar.current).get('x') ? styler(this.fixedRightBar.current).get('x') : '100%'
			},
			to: {
				x: '0%'
			},
			duration: 300,
			ease: easing.easeIn
		}).start({
			update: v => styler(this.fixedRightBar.current).set(v)
		});

		this.setState({ openRightBar: true });
	}

	closeRightBar() {
		console.log('close');

		tween({
			from: {
				x: styler(this.fixedRightBar.current).get('x') ? styler(this.fixedRightBar.current).get('x') : '0%'
			},
			to: {
				x: '100%'
			},
			duration: 300,
			ease: easing.easeIn
		}).start({
			update: v => styler(this.fixedRightBar.current).set(v)
		});

		this.setState({ openRightBar: false });
	}

	render() {
		return (
			<div id="app-layout">
				<i className="icon-bars p-fixed ma-3" onClick={this.toggleRightBar}></i>

				<div id="app-layout-content-wrapper" className={scopedStyles.contentWrapper}>
					{this.props.children}
				</div>

				<div id="fixed-right-bar" ref={this.fixedRightBar} className={`${scopedStyles.fixedRightBar} p-fixed d-flex`}>
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
