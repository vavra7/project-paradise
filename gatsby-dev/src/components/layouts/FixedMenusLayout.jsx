import React, { Component } from 'react';
import PropTypes from 'prop-types';
import scopedStyles from './FixedMenusLayout.module.scss';
import { pointer, styler, value, chain, action, calc, listen, inertia, tween, easing } from 'popmotion';
import MobileBottomMenu from '../menus/MobileBottomMenu';
import { connect } from 'react-redux';
import { rightBarSetActive } from '../../actions/fixedMenusActions';
import { eventEmitter } from '../../events';
import { EVENTS } from '../../events/types';

const TWEEN_DURATION = 250;

class FixedMenusLayout extends Component {
	static propTypes = {
		children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element]).isRequired
	};

	constructor(props) {
		super(props);
		this.state = {
			handlerTopPosition: 0
		};

		this.startManualSwipe = this.startManualSwipe.bind(this);
		this.bottomBarToggle = this.bottomBarToggle.bind(this);

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
		this.listeners = {
			finishManualSwipe: null
		};

		eventEmitter.subscribe(EVENTS.FIXED_MENUS.RIGHT_BAR_TOGGLE, () => this.rightBarToggle());
	}

	rightBarToggle() {
		const from = this.rightBar.styler.get('x');
		let to = 0;

		if (this.props.rightBarIsActive && this.rightBar.directionOpen) to = this.rightBar.ref.current.offsetWidth;

		this.animateTween(from, to, TWEEN_DURATION);
	}

	handlerShowIn() {
		setTimeout(() => {
			tween({
				from: 0,
				to: 1,
				duration: 400,
				ease: easing.linear
			}).start(this.handler.stylerOpacity);
		}, 500);
	}

	bottomBarToggle(rightBarX) {
		const maxBoundary = this.bottomBar.ref.current.offsetHeight + 50;
		const v = (this.rightBar.ref.current.offsetWidth - rightBarX) * 0.4;

		if (maxBoundary < v || v < 0) return;

		this.bottomBar.stylerY.update(v);
	}

	startManualSwipe() {
		if (this.rightBar.inProgress.manual) return;
		if (this.listeners.finishManualSwipe) this.listeners.finishManualSwipe.stop();
		this.listeners.finishManualSwipe = listen(document, 'touchend mouseup').start(() => {
			this.listeners.finishManualSwipe.stop();
			this.finishManualSwipe();
		});

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

			this.animateTween(from, to, TWEEN_DURATION);
		} else if (-600 < velocity && velocity < 600) {
			const from = this.rightBar.styler.get('x');
			const to = velocity < 0 ? 0 : this.rightBar.ref.current.offsetWidth;

			this.animateTween(from, to, TWEEN_DURATION);
		} else {
			this.animateInertia(velocity);
		}
	}

	animateTween(from, to, duration) {
		if (!this.props.rightBarIsActive) this.props.rightBarSetActive(true);
		this.rightBar.inProgress.manual = false;
		this.rightBar.inProgress.auto = true;
		this.rightBar.directionOpen = !to;

		chain(
			tween({
				from: from,
				to: to,
				duration: duration,
				ease: easing.linear
			}),
			action(action => {
				this.props.rightBarSetActive(!to);
				this.rightBar.inProgress.auto = false;
				action.complete();
			})
		).start(this.rightBar.stylerX);
	}

	animateInertia(velocity) {
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

	handlerPosition() {
		if (Math.abs(this.state.handlerTopPosition - this.props.windowHeight / 2) > 70)
			this.setState({ handlerTopPosition: this.props.windowHeight / 2 });
	}

	rightBarPosition() {
		this.rightBar.stylerX.update(this.rightBar.ref.current.offsetWidth);
	}

	componentDidMount() {
		this.rightBar.styler = styler(this.rightBar.ref.current);
		this.rightBar.stylerX = value(this.rightBar.ref.current.offsetWidth, v => this.rightBar.styler.set('x', v));

		this.handler.styler = styler(this.handler.ref.current);
		this.handler.stylerOpacity = value(0, v => this.handler.styler.set('opacity', v));

		this.bottomBar.styler = styler(this.bottomBar.ref.current);
		this.bottomBar.stylerY = value(0, v => this.bottomBar.styler.set('y', v));

		this.rightBar.subscriber = this.rightBar.stylerX.subscribe(this.bottomBarToggle);

		this.handlerPosition();
		this.handlerShowIn();

		// document.documentElement.style.position = 'fixed';

		// function preventDefault(e) {
		// 	e.preventDefault();
		// }

		// function disableScroll() {
		// 	document.body.addEventListener('touchmove', preventDefault, { passive: false });
		// }

		// disableScroll();
	}

	componentDidUpdate(prevProps) {
		if (
			!prevProps.swipeAxisX &&
			this.props.swipeAxisX &&
			this.props.rightBarIsActive &&
			!this.rightBar.inProgress.manual
		)
			this.startManualSwipe();
		if (prevProps.windowHeight !== this.props.windowHeight) this.handlerPosition();
		if (prevProps.windowWidth !== this.props.windowWidth) this.rightBarPosition();
	}

	componentWillUnmount() {
		if (this.rightBar.subscriber) this.rightBar.subscriber.unsubscribe();
		Object.keys(this.listeners).forEach(listener => {
			if (this.listeners[listener]) this.listeners[listener].stop();
		});
	}

	render() {
		return (
			<div id="fixed-menus-layout">
				<div id="fixed-menus-content-wrapper" className={scopedStyles.contentWrapper}>
					{this.props.children}
				</div>

				<div id="fixed-right-bar" ref={this.rightBar.ref} className={`${scopedStyles.fixedRightBar} p-fixed d-flex`}>
					<div
						ref={this.handler.ref}
						className={`${scopedStyles.rightBarHandlerContainer} p-absolute`}
						onMouseDown={this.startManualSwipe}
						onTouchStart={this.startManualSwipe}
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
	swipeAxisX: state.app.swipeAxis.x,
	windowWidth: state.app.width,
	windowHeight: state.app.height,
	rightBarIsActive: state.fixedMenus.rightBarIsActive
});

const mapDispatchToProps = {
	rightBarSetActive
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(FixedMenusLayout);
