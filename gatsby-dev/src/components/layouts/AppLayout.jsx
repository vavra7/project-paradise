import React, { Component } from 'react';
import PropTypes from 'prop-types';
import scopedStyles from './AppLayout.module.scss';
import { tween, easing, styler, listen, value, pointer, calc } from 'popmotion';
import MobileBottomMenu from '../menus/MobileBottomMenu';

const DURATION = 300;

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
			maxBoundary: null
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
			duration: DURATION,
			ease: easing.easeIn
		}).start({
			update: v => styler(this.elRightBar.current).set(v)
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
			duration: DURATION,
			ease: easing.easeIn
		}).start({
			update: v => styler(this.elRightBar.current).set(v)
		});

		this.setState({ openRightBar: false });
	}

	getRightBarXPercentage() {
		return parseFloat(styler(this.elRightBar.current).get('x'));
	}

	getRightBarNewXPercentage(clientX, handlerOffset) {
		const windowWidth = window.innerWidth;
		const rightBarWidth = this.elRightBar.current.offsetWidth;

		return Math.min(Math.max(((clientX - windowWidth + rightBarWidth + handlerOffset) / rightBarWidth) * 100, 0), 100);
	}

	initRightBar() {
		this.swipingRightBar.styler = styler(this.elRightBar.current);
		this.swipingRightBar.stylerXVal = value(0, v => this.swipingRightBar.styler.set('x', v));
		this.swipingRightBar.styler.set('x', this.elRightBar.current.offsetWidth);
		this.swipingRightBar.maxBoundary = this.elRightBar.current.offsetWidth;
	}

	componentDidMount() {
		this.initRightBar();

		listen(window, 'resize').start(() => {
			this.initRightBar();
		});

		listen(this.elHandlerContainer.current, 'touchstart mousedown').start(() => {
			const overDragPipe = v => {
				if (v < 0) {
					return calc.getValueFromProgress(0, v, 0.1);
				} else if (this.swipingRightBar.maxBoundary < v) {
					return calc.getValueFromProgress(this.swipingRightBar.maxBoundary, v, 0.1);
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
			console.log('end');
			this.swipingRightBar.stylerXVal.stop();
			console.log(this.swipingRightBar.styler.get('x'));
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
