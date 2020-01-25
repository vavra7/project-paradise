import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setAppWidthHeight, setScrollEnabled } from '../../../store/appRoot/actions';
import { listen } from 'popmotion';
import { event } from '../../../events';
import { EVENTS } from '../../../events/types';
import PropTypes from 'prop-types';

const SCROLL_CHECK_INTERVAL = 100;

class AppRootHandler extends Component {
	static propTypes = {
		children: PropTypes.element.isRequired,
		setAppWidthHeight: PropTypes.func.isRequired,
		scrollEnabled: PropTypes.bool.isRequired,
		setScrollEnabled: PropTypes.func.isRequired
	};

	//#region [ constructor ]

	constructor(props) {
		super(props);
		this.state = {
			swipe: {
				inProgress: false,
				inProgressX: false,
				inProgressY: false
			},
			scroll: {
				inProgress: false
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

		event.listen(EVENTS.APP_ROOT.SET_SCROLL_ENABLED, enable => {
			if (enable) {
				this.scrollEnable();
			} else {
				this.scrollDisable();
			}
		});
	}

	//#endregion

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
		if (this.props.scrollEnabled) return;

		document.body.classList.remove('scrollDisabled');
		this.props.setScrollEnabled(true);
	}

	scrollDisable() {
		if (!this.props.scrollEnabled) return;

		document.body.classList.add('scrollDisabled');
		this.props.setScrollEnabled(false);
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

	//#region [ lifeCycleMethods ]

	componentDidMount() {
		this.listeners.resize = listen(window, 'resize').start(() => {
			this.props.setAppWidthHeight(window.innerWidth, window.innerHeight);
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

	componentWillUnmount() {
		Object.keys(this.listeners).forEach(listener => {
			if (this.listeners[listener]) this.listeners[listener].stop();
		});
	}

	//#endregion

	render() {
		return <>{this.props.children}</>;
	}
}

const mapStateToProps = state => ({
	scrollEnabled: state.appRoot.scrollEnabled
});

const mapDispatchToProps = {
	setAppWidthHeight,
	setScrollEnabled
};

export default connect(mapStateToProps, mapDispatchToProps)(AppRootHandler);
