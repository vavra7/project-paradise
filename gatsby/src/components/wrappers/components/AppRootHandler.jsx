import React, { Component } from 'react';
import { connect } from 'react-redux';
import { appWidthHeight } from '../../../actions/appRootActions';
import { listen } from 'popmotion';
import { event } from '../../../events';
import { EVENTS } from '../../../events/types';

const SCROLL_CHECK_INTERVAL = 100;

export class AppRootHandler extends Component {
	constructor(props) {
		super(props);
		this.state = {
			swipe: {
				inProgress: false,
				inProgressX: false,
				inProgressY: false
			},
			scroll: {
				inProgress: false,
				enabled: true
			},
			swipeScroll: {
				inProgress: false
			}
		};

		this.scrollTimeoutCheck = null;
		this.lastTouch = {
			x: null,
			y: null
		};
		this.swipeEvaluationFinish = false;

		this.listeners = {};
	}

	touchStart(e) {
		this.swipeEvaluationFinish = false;
		this.lastTouch = {
			x: Math.round(e.touches[0].clientX),
			y: Math.round(e.touches[0].clientY)
		};
	}

	swipeStart(e) {
		if (this.swipeEvaluationFinish) return;

		const xDiff = Math.abs(this.lastTouch.x - Math.round(e.touches[0].clientX));
		const yDiff = Math.abs(this.lastTouch.y - Math.round(e.touches[0].clientY));

		let inProgressX = false;
		let inProgressY = false;

		if (xDiff * 0.75 > yDiff) inProgressX = true;
		if (yDiff * 0.75 > xDiff) inProgressY = true;

		this.setState({
			swipe: {
				...this.state.swipe,
				...{
					inProgress: true,
					inProgressX,
					inProgressY
				}
			}
		});

		if (inProgressX) event.emit(EVENTS.APP_ROOT.SWIPE_X_START, e);

		this.swipeEvaluationFinish = true;
	}

	swipeFinish() {
		if (!this.state.swipe.inProgress && !this.state.swipe.inProgressX && !this.state.swipe.inProgressY) return;

		this.setState({
			swipe: {
				...this.state.swipe,
				...{
					inProgress: false,
					inProgressX: false,
					inProgressY: false
				}
			}
		});
	}

	scrollEnable() {
		if (this.state.scroll.enabled) return;

		document.body.classList.remove('scrollDisabled');
		this.setState({
			scroll: {
				...this.state.scroll,
				...{ enabled: true }
			}
		});
	}

	scrollDisable() {
		if (!this.state.scroll.enabled) return;

		document.body.classList.add('scrollDisabled');
		this.setState({
			scroll: {
				...this.state.scroll,
				...{ enabled: false }
			}
		});
	}

	scrollUpdate() {
		clearTimeout(this.scrollTimeoutCheck);

		if (!this.state.scroll.inProgress)
			this.setState({
				scroll: {
					...this.state.scroll,
					...{ inProgress: true }
				}
			});

		this.scrollTimeoutCheck = setTimeout(() => {
			if (this.state.scroll.inProgress) {
				this.setState({
					scroll: {
						...this.state.scroll,
						...{ inProgress: false }
					}
				});

				this.swipeScrollFinish();
			}
		}, SCROLL_CHECK_INTERVAL);
	}

	swipeScrollStart() {
		if (this.state.swipeScroll.inProgress) return;

		if (this.state.swipe.inProgress && this.state.scroll.inProgress)
			this.setState({
				swipeScroll: {
					...this.state.swipeScroll,
					...{ inProgress: true }
				}
			});
	}

	swipeScrollFinish() {
		if (!this.state.swipeScroll.inProgress) return;

		if (!this.state.scroll.inProgress && !this.state.swipe.inProgress) {
			this.setState({
				swipeScroll: {
					...this.state.swipeScroll,
					...{ inProgress: false }
				}
			});

			event.emit(EVENTS.APP_ROOT.SWIPE_SCROLL_FINISH);
		}
	}

	componentDidMount() {
		this.listeners.resize = listen(window, 'resize').start(() => {
			this.props.appWidthHeight(window.innerWidth, window.innerHeight);
		});

		this.listeners.touchstart = listen(document, 'touchstart').start(e => {
			this.touchStart(e);
		});

		this.listeners.touchmove = listen(document, 'touchmove', { passive: false }).start(e => {
			this.swipeStart(e);
			this.swipeScrollStart();
		});

		this.listeners.touchend = listen(document, 'touchend').start(() => {
			this.swipeFinish();
			this.swipeScrollFinish();

			event.emit(EVENTS.APP_ROOT.TOUCH_END);
		});

		this.listeners.mouseup = listen(document, 'mouseup').start(() => {
			event.emit(EVENTS.APP_ROOT.MOUSE_UP);
		});

		this.listeners.scroll = listen(window, 'scroll').start(() => {
			this.scrollUpdate();

			event.emit(EVENTS.APP_ROOT.SCROLL_UPDATE);
		});
	}

	componentDidUpdate(prevProps) {
		if (!prevProps.rightBarIsActive && this.props.rightBarIsActive) this.scrollDisable();
		if (prevProps.rightBarIsActive && !this.props.rightBarIsActive) this.scrollEnable();
	}

	componentWillUnmount() {
		Object.keys(this.listeners).forEach(listener => {
			if (this.listeners[listener]) this.listeners[listener].stop();
		});
	}

	render() {
		return <>{this.props.children}</>;
	}
}

const mapStateToProps = state => ({
	rightBarIsActive: state.fixedMenus.rightBarIsActive
});

const mapDispatchToProps = {
	appWidthHeight
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AppRootHandler);
