import React, { Component } from 'react';
import PropTypes from 'prop-types';
import scopedStyles from './FixedRightBar.module.scss';
import { connect } from 'react-redux';
import { rightBarSetActive } from '../../../actions/fixedBarsActions';
import { styler, value, listen, pointer, calc, chain, tween, easing, action, inertia } from 'popmotion';
import { event } from '../../../events';
import { EVENTS } from '../../../events/types';

const DIFF_HANDLER_UPDATE = 60;
const HANDLER_REVEAL_DELAY = 400;
const HANDLER_REVEAL_DURATION = 1000;

const OVER_DRAG_SPEED_MODIFIER = 0.15;
const MIN_VELOCITY = 600;
const MAX_VELOCITY = 1800;
const TWEEN_DURATION = 250;

class FixedRightBar extends Component {
	static propTypes = {
		children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element])
	};

	//#region [ constructor ]

	constructor(props) {
		super(props);

		this.state = {
			handlerPosition: 0
		};

		this.rightBar = {
			ref: React.createRef(),
			styler: null,
			stylerX: null,
			inProgress: {
				manual: false,
				auto: false
			},
			directionOpen: true,
			subscriber: null
		};

		this.handler = {
			ref: React.createRef(),
			styler: null,
			stylerOpacity: null
		};

		this.listeners = {
			onHandler: null
		};

		event.listen(EVENTS.FIXED_BARS.RIGHT_BAR_TOGGLE, () => this.onToggle());
		event.listen(EVENTS.APP_ROOT.TOUCH_END, () => this.finishManualSwipe());
		event.listen(EVENTS.APP_ROOT.MOUSE_UP, () => this.finishManualSwipe());
		event.listen(EVENTS.APP_ROOT.SWIPE_X_START, e => {
			if (this.props.rightBarActive) this.startManualSwipe(e);
		});
	}

	//endregion

	setHandlerPosition() {
		if (Math.abs(this.state.handlerPosition - this.props.windowHeight / 2) > DIFF_HANDLER_UPDATE)
			this.setState({ handlerPosition: this.props.windowHeight / 2 });
	}

	handlerReveal() {
		setTimeout(() => {
			tween({
				from: 0,
				to: 1,
				duration: HANDLER_REVEAL_DURATION,
				ease: easing.linear
			}).start(this.handler.stylerOpacity);
		}, HANDLER_REVEAL_DELAY);
	}

	refreshRightBarPosition() {
		this.rightBar.styler.set('x', this.rightBar.ref.current.offsetWidth);
	}

	startManualSwipe(e) {
		if (this.rightBar.inProgress.manual) return;
		if (e.cancelable) e.preventDefault();

		this.rightBar.inProgress.auto = false;
		this.rightBar.inProgress.manual = true;
		if (!this.props.rightBarActive) this.props.rightBarSetActive(true);

		const overDragPipe = v => {
			if (v < 0) {
				return calc.getValueFromProgress(0, v, OVER_DRAG_SPEED_MODIFIER);
			} else if (this.rightBar.ref.current.offsetWidth < v) {
				return calc.getValueFromProgress(this.rightBar.ref.current.offsetWidth, v, OVER_DRAG_SPEED_MODIFIER);
			} else {
				return v;
			}
		};

		pointer({
			preventDefault: e.cancelable,
			x: this.rightBar.styler.get('x')
		})
			.pipe(
				({ x }) => x,
				overDragPipe
			)
			.start(this.rightBar.stylerX);
	}

	finishManualSwipe() {
		if (!this.rightBar.inProgress.manual || this.rightBar.inProgress.auto) return;

		const velocity = this.rightBar.stylerX.getVelocity();

		if (velocity === 0) {
			const progress = calc.getProgressFromValue(
				0,
				this.rightBar.ref.current.offsetWidth,
				this.rightBar.styler.get('x')
			);
			const from = this.rightBar.styler.get('x');
			const to = progress < 0.5 ? 0 : this.rightBar.ref.current.offsetWidth;

			this.rightBarTween(from, to);
		} else if (-MIN_VELOCITY < velocity && velocity < MIN_VELOCITY) {
			const from = this.rightBar.styler.get('x');
			const to = velocity < 0 ? 0 : this.rightBar.ref.current.offsetWidth;

			this.rightBarTween(from, to);
		} else {
			this.rightBarInertia(velocity);
		}
	}

	rightBarTween(from, to) {
		if (!this.props.rightBarActive) this.props.rightBarSetActive(true);
		this.rightBar.inProgress.manual = false;
		this.rightBar.inProgress.auto = true;
		this.rightBar.directionOpen = !to;

		chain(
			tween({
				from: from,
				to: to,
				duration: TWEEN_DURATION,
				ease: easing.linear
			}),
			action(action => {
				this.props.rightBarSetActive(!to);
				this.rightBar.inProgress.auto = false;
				action.complete();
			})
		).start(this.rightBar.stylerX);
	}

	rightBarInertia(velocity) {
		if (!this.rightBar.inProgress.manual) return;

		this.rightBar.inProgress.manual = false;
		this.rightBar.inProgress.auto = true;
		this.rightBar.directionOpen = velocity > 0 ? false : true;

		chain(
			inertia({
				min: 0,
				max: this.rightBar.ref.current.offsetWidth,
				from: this.rightBar.styler.get('x'),
				velocity: Math.max(Math.min(velocity, MAX_VELOCITY), -MAX_VELOCITY)
			}).while(v => 0 <= v && v <= this.rightBar.ref.current.offsetWidth),
			action(action => {
				if (velocity > 0) {
					this.rightBar.stylerX.update(this.rightBar.ref.current.offsetWidth);
					this.props.rightBarSetActive(false);
				} else {
					this.rightBar.stylerX.update(0);
					this.props.rightBarSetActive(true);
				}
				this.rightBar.inProgress.auto = false;
				action.complete();
			})
		).start(this.rightBar.stylerX);
	}

	onToggle() {
		const from = this.rightBar.styler.get('x');
		let to = 0;

		if (this.props.rightBarActive && this.rightBar.directionOpen) to = this.rightBar.ref.current.offsetWidth;

		this.rightBarTween(from, to);
	}

	// region [ lifeCycleMethods ]

	componentDidMount() {
		this.rightBar.styler = styler(this.rightBar.ref.current);
		this.rightBar.stylerX = value(this.rightBar.ref.current.offsetWidth, v => this.rightBar.styler.set('x', v));

		this.handler.styler = styler(this.handler.ref.current);
		this.handler.stylerOpacity = value(0, v => this.handler.styler.set('opacity', v));

		this.listeners.onHandler = listen(this.handler.ref.current, 'touchstart mousedown', { passive: false }).start(e => {
			this.startManualSwipe(e);
		});

		this.rightBar.subscriber = this.rightBar.stylerX.subscribe(v => {
			const rightBarProgress = this.rightBar.ref.current.offsetWidth - v;
			event.emit(EVENTS.FIXED_BARS.RIGHT_BAR_UPDATE, rightBarProgress);
		});

		this.setHandlerPosition();
		this.handlerReveal();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.windowHeight !== this.props.windowHeight) this.setHandlerPosition();
		if (prevProps.windowWidth !== this.props.windowWidth) this.refreshRightBarPosition();
	}

	componentWillUnmount() {
		if (this.rightBar.subscriber) this.rightBar.subscriber.unsubscribe();
		Object.keys(this.listeners).forEach(listener => {
			if (this.listeners[listener]) this.listeners[listener].stop();
		});
	}

	//#endregion

	render() {
		return (
			<div id="fixed-right-bar" ref={this.rightBar.ref} className={`${scopedStyles.fixedRightBar} p-fixed d-flex`}>
				<div
					ref={this.handler.ref}
					className={`${scopedStyles.handlerContainer} p-absolute`}
					style={{ top: this.state.handlerPosition }}
				></div>

				<div className={`${scopedStyles.contentContainer} fg-1 pa-2`}>{this.props.children}</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	windowHeight: state.app.height,
	windowWidth: state.app.width,
	rightBarActive: state.fixedBars.rightBarActive
});

const mapDispatchToProps = {
	rightBarSetActive
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(FixedRightBar);
