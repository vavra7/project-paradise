import React, { Component } from 'react';
import PropTypes from 'prop-types';
import scopedStyles from './AppLayout.module.scss';
import { tween, easing, styler, listen } from 'popmotion';
import MobileBottomMenu from '../menus/MobileBottomMenu';

class AppLayout extends Component {
	constructor(props) {
		super(props);
		this.state = {
			openRightBar: false
		};
		this.fixedRightBar = React.createRef();
		this.rightBarHandlerContainer = React.createRef();
		this.onToggleRightBar = this.onToggleRightBar.bind(this);

		this.swipingRightBar = {
			inProgress: false,
			handlerRightOffset: null
		};
	}

	onToggleRightBar() {
		if (!this.state.openRightBar) {
			this.openRightBar();
		} else {
			this.closeRightBar();
		}
	}

	openRightBar() {
		tween({
			from: {
				x: `${this.getRightBarXPercentage()}%`
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
		tween({
			from: {
				x: `${this.getRightBarXPercentage()}%`
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

	getRightBarXPercentage() {
		return parseFloat(styler(this.fixedRightBar.current).get('x'));
	}

	getRightBarNewXPercentage(clientX, handlerOffset) {
		const windowWidth = window.innerWidth;
		const rightBarWidth = this.fixedRightBar.current.offsetWidth;

		return Math.min(Math.max(((clientX - windowWidth + rightBarWidth + handlerOffset) / rightBarWidth) * 100, 0), 100);
	}

	componentDidMount() {
		styler(this.fixedRightBar.current).set('x', '100%');

		listen(this.rightBarHandlerContainer.current, 'touchstart').start(e => {
			const clientX = e.touches[0].clientX;
			const windowWidth = window.innerWidth;
			const rightBarWidth = this.fixedRightBar.current.offsetWidth;
			const rightBarXPosition = (this.getRightBarXPercentage() * rightBarWidth) / 100 + windowWidth - rightBarWidth;

			this.swipingRightBar.handlerRightOffset = parseInt(rightBarXPosition - clientX);
			this.swipingRightBar.inProgress = true;
		});

		listen(this.rightBarHandlerContainer.current, 'mousedown').start(e => {
			this.swipingRightBar.handlerRightOffset = e.path[0].offsetWidth - e.offsetX;
			this.swipingRightBar.inProgress = true;
		});

		listen(this.rightBarHandlerContainer.current, 'touchmove').start(e => {
			const newPercentage = this.getRightBarNewXPercentage(
				e.touches[0].clientX,
				this.swipingRightBar.handlerRightOffset
			);

			styler(this.fixedRightBar.current).set('x', `${newPercentage}%`);
		});

		listen(document, 'mousemove').start(e => {
			if (!this.swipingRightBar.inProgress) return;

			const newPercentage = this.getRightBarNewXPercentage(e.clientX, this.swipingRightBar.handlerRightOffset);
			styler(this.fixedRightBar.current).set('x', `${newPercentage}%`);
		});

		listen(document, 'mouseup touchend').start(() => {
			if (!this.swipingRightBar.inProgress) return;

			const currentPercentage = this.getRightBarXPercentage();

			if (100 > currentPercentage && currentPercentage >= 50) {
				this.closeRightBar();
			} else if (50 >= currentPercentage && currentPercentage > 0) {
				this.openRightBar();
			}

			this.swipingRightBar.inProgress = false;
		});
	}

	componentWillUnmount() {}

	render() {
		return (
			<div id="app-layout">
				<i className="icon-bars p-fixed ma-3" onClick={this.onToggleRightBar}></i>

				<div id="app-layout-content-wrapper" className={scopedStyles.contentWrapper}>
					{this.props.children}
				</div>

				<div id="fixed-right-bar" ref={this.fixedRightBar} className={`${scopedStyles.fixedRightBar} p-fixed d-flex`}>
					<div
						ref={this.rightBarHandlerContainer}
						className={`${scopedStyles.rightBarHandlerContainer} p-absolute`}
					></div>

					<div className={`${scopedStyles.rightBarContentContainer} fg-1`}></div>
				</div>

				<div
					id="fixed-bottom-bar"
					className={`${scopedStyles.fixedBottomBar} p-fixed d-flex jc-flex-end fd-column bg-white shadow-t-3 line-t-2 hide-md-up`}
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
