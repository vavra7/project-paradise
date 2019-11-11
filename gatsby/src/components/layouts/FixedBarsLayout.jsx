import React, { Component } from 'react';
import PropTypes from 'prop-types';
import scopedStyles from './FixedBarsLayout.module.scss';
import { pointer, styler, value, chain, action, calc, inertia, tween, easing, listen } from 'popmotion';
import MobileBottomMenu from '../menus/MobileBottomMenu';
import MobileTopMenu from '../menus/MobileTopMenu';
import DesktopTopMenu from '../menus/DesktopTopMenu';
import { connect } from 'react-redux';
import { rightBarSetActive } from '../../actions/fixedBarsActions';
import { event } from '../../events';
import { EVENTS } from '../../events/types';
import BREAKPOINTS from '../../styles/base/_breakpoints.scss';

const TWEEN_DURATION = 250;
const TB_BB_SPEED = 0.2;
const TB_DESKTOP_REVEAL_POINT = 300;
const TB_EXTRA_OFFSET = 2;

class FixedBarsLayout extends Component {
	static propTypes = {
		children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element]).isRequired
	};

	//#region [ constructor ]

	constructor(props) {
		super(props);
		this.state = {
			handlerTopPosition: 0,
			desktopWidth: false
		};

		this.prevPageYOffset = 0;
		this.checkScrollTimeout = null;
		this.topBar = {
			ref: React.createRef(),
			styler: null,
			stylerY: null,
			max: 0,
			onRightBar: true,
			desktopTweenInProgress: false
		};
		this.rightBar = {
			ref: React.createRef(),
			styler: null,
			stylerX: null,
			subscriber: null,
			directionOpen: true,
			inProgress: {
				manual: false,
				auto: false
			}
		};
		this.handler = {
			ref: React.createRef(),
			styler: null,
			stylerOpacity: null
		};
		this.bottomBar = {
			ref: React.createRef(),
			styler: null,
			stylerY: null
		};
		this.listeners = {};

		event.listen(EVENTS.FIXED_BARS.RIGHT_BAR_TOGGLE, () => this.rBToggle());
		event.listen(EVENTS.APP_ROOT.SCROLL_UPDATE, () => {
			this.tBMobileOnScroll();
			this.tBDesktopOnScroll();
		});
		event.listen(EVENTS.APP_ROOT.SWIPE_SCROLL_FINISH, () => this.tBFinish());
		event.listen(EVENTS.APP_ROOT.TOUCH_END, () => this.rBFinishManualSwipe());
		event.listen(EVENTS.APP_ROOT.MOUSE_UP, () => this.rBFinishManualSwipe());
		event.listen(EVENTS.APP_ROOT.SWIPE_X_START, e => {
			if (this.props.rightBarIsActive) this.rBStartManualSwipe(e);
		});
	}

	//#endregion

	//#region [ rgba(247, 249, 97, 0.03) ] Top Bar

	tBRefresh() {
		let newTbPosition = 0;

		this.setState({
			desktopWidth: this.props.windowWidth < BREAKPOINTS.MD_MIN ? false : true
		});

		this.topBar.max = -this.topBar.ref.current.offsetHeight - TB_EXTRA_OFFSET;

		if (this.state.desktopWidth && window.pageYOffset < TB_DESKTOP_REVEAL_POINT) {
			newTbPosition = this.topBar.max;
		}

		this.topBar.styler.set('y', newTbPosition);
	}

	tBFinish() {
		if (this.props.rightBarIsActive) return;

		const currentPosition = this.topBar.styler.get('y');

		if (0 <= currentPosition || currentPosition <= this.topBar.max) return;

		tween({
			from: currentPosition,
			to: 0,
			duration: TWEEN_DURATION,
			ease: easing.linear
		}).start(this.topBar.stylerY);
	}

	tbShouldOnRb() {
		this.topBar.onRightBar = this.topBar.styler.get('y') === this.topBar.max ? true : false;
	}

	tBOnRbProgress(rightBarX) {
		if (this.state.desktopWidth || !this.topBar.onRightBar || !this.props.rightBarIsActive) return;

		const v = (this.rightBar.ref.current.offsetWidth - rightBarX) * TB_BB_SPEED + this.topBar.max;
		if (0 < v) {
			if (this.topBar.styler.get('y') !== 0) this.topBar.styler.set('y', 0);
			return;
		} else {
			this.topBar.stylerY.update(v);
		}
	}

	tBDesktopOnScroll() {
		if (!this.state.desktopWidth || this.topBar.desktopTweenInProgress) return;

		const currentPosition = Math.round(this.topBar.styler.get('y'));
		const revealPointDistance = window.pageYOffset - TB_DESKTOP_REVEAL_POINT;
		let to = 0;

		if (currentPosition < 0 && revealPointDistance < 0) return;
		if (currentPosition === 0 && revealPointDistance >= 0) return;
		if (currentPosition === 0 && revealPointDistance < 0) to = this.topBar.max;

		this.topBar.desktopTweenInProgress = true;

		chain(
			tween({
				from: currentPosition,
				to: to,
				duration: TWEEN_DURATION,
				ease: easing.linear
			}),
			action(action => {
				this.topBar.desktopTweenInProgress = false;
				action.complete();
				this.tBDesktopOnScroll();
			})
		).start(this.topBar.stylerY);
	}

	tBMobileOnScroll() {
		if (this.state.desktopWidth) return;

		const diff = this.prevPageYOffset - window.pageYOffset;
		const currentPosition = this.topBar.styler.get('y');
		const progress = currentPosition + diff;

		this.prevPageYOffset = window.pageYOffset;
		if ((currentPosition === this.topBar.max && diff < 0) || (currentPosition === 0 && diff > 0)) return;
		this.topBar.stylerY.update(Math.max(Math.min(progress, 0), this.topBar.max));
	}

	//#endregion

	//#region [ rgba(122, 249, 97, 0.04) ] Right Bar

	rBToggle() {
		const from = this.rightBar.styler.get('x');
		let to = 0;

		if (this.props.rightBarIsActive && this.rightBar.directionOpen) to = this.rightBar.ref.current.offsetWidth;

		this.rBAnimateTween(from, to);
	}

	rBHandlerShowIn() {
		setTimeout(() => {
			tween({
				from: 0,
				to: 1,
				duration: 400,
				ease: easing.linear
			}).start(this.handler.stylerOpacity);
		}, 500);
	}

	rBStartManualSwipe(e) {
		if (this.rightBar.inProgress.manual) return;

		if (e.cancelable) e.preventDefault();
		this.rightBar.inProgress.auto = false;
		this.rightBar.inProgress.manual = true;
		if (!this.props.rightBarIsActive) this.props.rightBarSetActive(true);

		const overDragPipe = v => {
			if (v < 0) {
				return calc.getValueFromProgress(0, v, 0.15);
			} else if (this.rightBar.ref.current.offsetWidth < v) {
				return calc.getValueFromProgress(this.rightBar.ref.current.offsetWidth, v, 0.15);
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

	rBFinishManualSwipe() {
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

			this.rBAnimateTween(from, to);
		} else if (-600 < velocity && velocity < 600) {
			const from = this.rightBar.styler.get('x');
			const to = velocity < 0 ? 0 : this.rightBar.ref.current.offsetWidth;

			this.rBAnimateTween(from, to);
		} else {
			this.rBAnimateInertia(velocity);
		}
	}

	rBAnimateTween(from, to) {
		if (!this.props.rightBarIsActive) this.props.rightBarSetActive(true);
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

	rBAnimateInertia(velocity) {
		if (!this.rightBar.inProgress.manual) return;

		this.rightBar.inProgress.manual = false;
		this.rightBar.inProgress.auto = true;
		this.rightBar.directionOpen = velocity > 0 ? false : true;

		chain(
			inertia({
				min: 0,
				max: this.rightBar.ref.current.offsetWidth,
				from: this.rightBar.styler.get('x'),
				velocity: Math.max(Math.min(velocity, 1700), -1700)
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

	rBHandlerPosition() {
		if (Math.abs(this.state.handlerTopPosition - this.props.windowHeight / 2) > 70)
			this.setState({ handlerTopPosition: this.props.windowHeight / 2 });
	}

	//#endregion

	//#region [ rgba(249, 199, 97, 0.03) ] Bottom Bar

	rBPosition() {
		this.rightBar.stylerX.update(this.rightBar.ref.current.offsetWidth);
	}

	bBOnRbProgress(rightBarX) {
		const maxBoundary = this.bottomBar.ref.current.offsetHeight + 50;
		const v = (this.rightBar.ref.current.offsetWidth - rightBarX) * TB_BB_SPEED;

		if (maxBoundary < v || v < 0) return;

		this.bottomBar.stylerY.update(v);
	}

	//#endregion

	//#region [ lifeCycleMethods ]

	componentDidMount() {
		this.topBar.styler = styler(this.topBar.ref.current);
		this.topBar.stylerY = value(-this.topBar.ref.current.offsetHeight - TB_EXTRA_OFFSET, v =>
			this.topBar.styler.set('y', v)
		);

		this.rightBar.styler = styler(this.rightBar.ref.current);
		this.rightBar.stylerX = value(this.rightBar.ref.current.offsetWidth, v => this.rightBar.styler.set('x', v));

		this.handler.styler = styler(this.handler.ref.current);
		this.handler.stylerOpacity = value(0, v => this.handler.styler.set('opacity', v));

		this.bottomBar.styler = styler(this.bottomBar.ref.current);
		this.bottomBar.stylerY = value(0, v => this.bottomBar.styler.set('y', v));

		this.rightBar.subscriber = this.rightBar.stylerX.subscribe(v => {
			this.bBOnRbProgress(v);
			this.tBOnRbProgress(v);
		});

		this.rBHandlerPosition();
		this.rBHandlerShowIn();
		this.tBRefresh();

		this.listeners.onHandler = listen(this.handler.ref.current, 'touchstart mousedown', { passive: false }).start(e => {
			this.rBStartManualSwipe(e);
		});
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.windowHeight !== this.props.windowHeight) this.rBHandlerPosition();
		if (prevProps.windowWidth !== this.props.windowWidth) {
			this.tBRefresh();
			this.rBPosition();
		}
		if (!prevProps.rightBarIsActive && this.props.rightBarIsActive) this.tbShouldOnRb();
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
			<div id="fixed-bars-layout" className={`${!this.state.desktopWidth ? scopedStyles.bottomBarOffset : ''}`}>
				<div id="fixed-top-bar" ref={this.topBar.ref} className={`${scopedStyles.fixedTopBar} p-fixed`}>
					<div className="hide-md-up">
						<MobileTopMenu></MobileTopMenu>
					</div>

					<div className="hide-sm-down">
						<DesktopTopMenu></DesktopTopMenu>
					</div>
				</div>

				<div id="fixed-right-bar" ref={this.rightBar.ref} className={`${scopedStyles.fixedRightBar} p-fixed d-flex`}>
					<div
						ref={this.handler.ref}
						className={`${scopedStyles.rightBarHandlerContainer} p-absolute`}
						style={{ top: this.state.handlerTopPosition }}
					></div>

					<div className={`${scopedStyles.rightBarContentContainer} fg-1 pa-2`}>
						Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi dolore fuga illo nihil voluptatem impedit
						voluptas doloremque, suscipit quas distinctio ratione, velit consectetur magni placeat vitae soluta
						excepturi, perspiciatis iusto atque quam veritatis. Esse animi excepturi ab nemo fugiat, dicta inventore
						autem placeat quas expedita repellat ratione fuga ullam ducimus enim minima vitae hic voluptatibus sunt
						consequuntur tempore exercitationem dignissimos illo? Necessitatibus quo totam sit? Officiis aperiam esse
						sed voluptates aspernatur facilis, tenetur dicta fuga ratione suscipit hic, consectetur debitis at quo aut
						nulla, animi possimus rerum dignissimos praesentium deleniti quas facere ad? Quas id nihil magni rerum quo.
						Asperiores similique temporibus ducimus cum earum nam harum itaque. Temporibus aliquid, fugiat minima,
						tenetur iste obcaecati dolore molestias ex debitis dignissimos voluptas. Officia non laboriosam doloremque
						animi, magni esse dolorem veritatis soluta fuga? Atque praesentium obcaecati quia placeat? Unde, autem illo?
						Aspernatur alias voluptatum vel id velit vitae voluptas minus. Voluptate culpa illum, totam tempore, alias
						nulla eveniet odio voluptatum laborum, quo deleniti aliquid? Id magni modi itaque natus tempora, et quos ea
						exercitationem inventore adipisci error vitae necessitatibus cumque accusamus facilis aspernatur ab sint
						quasi harum laudantium? Cupiditate, repudiandae rerum! Minima cumque sit corrupti minus, numquam quas dolor
						temporibus distinctio excepturi. Necessitatibus ipsam sint repudiandae, sequi natus recusandae quam
						veritatis esse temporibus iure reprehenderit eaque? Voluptatem eos quaerat cum. Neque, tempore, voluptates
						possimus quaerat ipsa, ducimus sequi exercitationem facilis hic enim tempora ex! Facilis doloribus, atque
						reprehenderit tempora corrupti impedit quasi soluta, quo modi obcaecati itaque dicta pariatur inventore.
						Voluptate ea inventore, a sapiente illo aliquam ab culpa ut est adipisci quaerat illum dolor tempore
						mollitia officiis accusantium sunt quae eaque natus velit tempora dolorum delectus id. Explicabo porro quod,
						deserunt, officia obcaecati expedita quam dignissimos, rem voluptatibus voluptatum dicta inventore? Neque
						hic ab at, nisi nihil, totam nobis nesciunt veritatis eum ullam, maxime deserunt. Laborum doloremque commodi
						molestiae et dolor delectus architecto quae mollitia reprehenderit, libero dicta veritatis ea tempora
						deleniti aliquid atque asperiores placeat ullam. Dolores, ipsum fugit. Alias numquam deserunt doloremque non
						ullam ex deleniti sint, accusamus, maxime officia cumque repellendus, eaque harum quod. Non, ipsam
						distinctio laudantium officia quasi eveniet quisquam deserunt blanditiis assumenda, iure eos debitis hic
						error delectus quibusdam nostrum sit voluptatum accusantium ab libero quidem expedita laboriosam. Nostrum,
						quos neque quae explicabo ex perferendis aperiam eligendi numquam cum exercitationem nisi veritatis velit
						voluptatem culpa vero non! Labore perferendis numquam eius ipsum dicta! Veniam quos ipsam quis ipsa ipsum
					</div>
				</div>

				{this.props.children}

				<div
					id="fixed-bottom-bar"
					ref={this.bottomBar.ref}
					className={`${scopedStyles.fixedBottomBar} p-fixed d-flex jc-flex-end fd-column bg-white shadow-t-3 line-t-2 hide-md-up`}
				>
					<MobileBottomMenu />
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	windowWidth: state.app.width,
	windowHeight: state.app.height,
	rightBarIsActive: state.fixedBars.rightBarIsActive
});

const mapDispatchToProps = {
	rightBarSetActive
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(FixedBarsLayout);
