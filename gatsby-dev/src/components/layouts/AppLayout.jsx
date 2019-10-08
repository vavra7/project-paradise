import React, { Component } from 'react';
import PropTypes from 'prop-types';
import scopedStyles from './AppLayout.module.scss';
import { tween, easing, styler, listen, value, pointer, calc, inertia } from 'popmotion';
import MobileBottomMenu from '../menus/MobileBottomMenu';

const DURATION = 400;

class AppLayout extends Component {
	constructor(props) {
		super(props);
		this.state = {
			openRightBar: false
		};
		this.elRightBar = React.createRef();
		this.elHandlerContainer = React.createRef();
		this.onToggleRightBar = this.onToggleRightBar.bind(this);

		this.swipingRightBar = {
			styler: null,
			stylerXVal: null,
			maxBoundary: null,
			windowWidth: null
		};
	}

	onToggleRightBar() {
		if (!this.state.openRightBar) {
			// this.openRightBar();
		} else {
			// this.closeRightBar();
		}
	}

	initRightBar() {
		this.swipingRightBar.styler = styler(this.elRightBar.current);
		this.swipingRightBar.stylerXVal = value(0, v => this.swipingRightBar.styler.set('x', v));
		this.swipingRightBar.styler.set('x', this.elRightBar.current.offsetWidth);
		this.swipingRightBar.maxBoundary = this.elRightBar.current.offsetWidth;
		this.swipingRightBar.windowWidth = window.innerWidth;
	}

	componentDidMount() {
		this.initRightBar();

		listen(window, 'resize').start(() => {
			if (this.swipingRightBar.windowWidth === window.innerWidth) return;
			this.initRightBar();
		});

		listen(this.elHandlerContainer.current, 'touchstart mousedown').start(() => {
			const overDragPipe = v => {
				if (v < 0) {
					return calc.getValueFromProgress(0, v, 0.15);
				} else if (this.swipingRightBar.maxBoundary < v) {
					return calc.getValueFromProgress(this.swipingRightBar.maxBoundary, v, 0.15);
				} else {
					return v;
				}
			};

			pointer({ x: this.swipingRightBar.styler.get('x') })
				.pipe(
					({ x }) => x,
					overDragPipe
				)
				.start(this.swipingRightBar.stylerXVal);
		});

		listen(document, 'touchend mouseup').start(() => {
			const velocity = this.swipingRightBar.stylerXVal.getVelocity();
			const progress = calc.getProgressFromValue(
				0,
				this.swipingRightBar.maxBoundary,
				this.swipingRightBar.stylerXVal.get()
			);

			if (velocity < -500 || 500 < velocity) {
				inertia({
					min: 0,
					max: this.swipingRightBar.maxBoundary,
					from: this.swipingRightBar.stylerXVal.get(),
					velocity: velocity,
					bounceStiffness: 5000,
					bounceDamping: 100000
				}).start(this.swipingRightBar.stylerXVal);
			} else if (velocity !== 0) {
				tween({
					from: this.swipingRightBar.stylerXVal.get(),
					to: velocity < 0 ? 0 : this.swipingRightBar.maxBoundary,
					duration: DURATION,
					ease: easing.linear
				}).start(this.swipingRightBar.stylerXVal);
			} else {
				tween({
					from: this.swipingRightBar.stylerXVal.get(),
					to: progress < 0.5 ? 0 : this.swipingRightBar.maxBoundary,
					duration: DURATION / 2,
					ease: easing.easeIn
				}).start(this.swipingRightBar.stylerXVal);
			}
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

				<div id="fixed-right-bar" ref={this.elRightBar} className={`${scopedStyles.fixedRightBar} p-fixed d-flex`}>
					<div ref={this.elHandlerContainer} className={`${scopedStyles.rightBarHandlerContainer} p-absolute`}></div>

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
