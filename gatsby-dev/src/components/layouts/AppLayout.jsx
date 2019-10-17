import React, { Component } from 'react';
import PropTypes from 'prop-types';
import scopedStyles from './AppLayout.module.scss';
import { pointer, styler, value, chain, action, calc, listen, inertia, tween, easing } from 'popmotion';
import MobileBottomMenu from '../menus/MobileBottomMenu';

class AppLayout extends Component {
	constructor(props) {
		super(props);
		this.state = {
			opened: false,
			windowWidth: 375,
			windowHeight: 667
		};
		this.startSwiping = this.startSwiping.bind(this);
		this.bottomBarToggler = this.bottomBarToggler.bind(this);
		this.rightBar = {
			ref: React.createRef(),
			styler: null,
			stylerX: null,
			subscriber: null,
			inProgress: false
		};
		this.bottomBar = {
			ref: React.createRef(),
			styler: null,
			stylerY: null
		};
		this.swipeDirection = {
			evaluationFinished: false,
			x: null,
			y: null
		};
		this.listeners = {
			swipeEnd: null,
			directionSwipeStart: null,
			directionSwipeMove: null,
			resizeFix: null
		};
	}

	componentDidMount() {
		this.rightBar.styler = styler(this.rightBar.ref.current);
		this.rightBar.stylerX = value(this.rightBar.ref.current.offsetWidth, v => this.rightBar.styler.set('x', v));
		this.bottomBar.styler = styler(this.bottomBar.ref.current);
		this.bottomBar.stylerY = value(0, v => this.bottomBar.styler.set('y', v));
		this.rightBar.subscriber = this.rightBar.stylerX.subscribe(this.bottomBarToggler);

		this.setState({ windowWidth: window.innerWidth });
		this.setState({ windowHeight: window.innerHeight });

		this.listeners.swipeEnd = listen(document, 'touchend mouseup').start(() => {
			this.finishSwipe();
		});

		this.listeners.resizeFix = listen(window, 'resize').start(() => {
			if (Math.abs(this.state.windowHeight - window.innerHeight) > 100)
				this.setState({ windowHeight: window.innerHeight });

			if (this.state.windowWidth !== window.innerWidth) {
				this.setState({ windowWidth: window.innerWidth });
				this.rightBar.stylerX.update(this.rightBar.ref.current.offsetWidth);
			}
		});
	}

	bottomBarToggler(rightBarX) {
		const maxBoundary = this.bottomBar.ref.current.offsetHeight + 50;
		const v = (this.rightBar.ref.current.offsetWidth - rightBarX) * 0.4;

		if (maxBoundary < v || v < 0) return;

		this.bottomBar.stylerY.update(v);
	}

	startSwiping() {
		this.setState({ opened: true });
		this.rightBar.inProgress = true;

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

	finishSwipe() {
		if (!this.rightBar.inProgress) return;
		const velocity = this.rightBar.stylerX.getVelocity();

		if (velocity === 0) {
			const progress = calc.getProgressFromValue(
				0,
				this.rightBar.ref.current.offsetWidth,
				this.rightBar.styler.get('x')
			);
			const from = this.rightBar.styler.get('x');
			const to = progress < 0.5 ? 0 : this.rightBar.ref.current.offsetWidth;

			this.animateTween(from, to, 200);
		} else if (-600 < velocity && velocity < 600) {
			const from = this.rightBar.styler.get('x');
			const to = velocity < 0 ? 0 : this.rightBar.ref.current.offsetWidth;

			this.animateTween(from, to, 500);
		} else {
			this.animateInertia(velocity);
		}
	}

	animateTween(from, to, duration) {
		chain(
			tween({
				from: from,
				to: to,
				duration: duration,
				ease: easing.linear
			}),
			action(action => {
				this.setState({ opened: to === 0 ? true : false });
				this.rightBar.inProgress = false;
				action.complete();
			})
		).start(this.rightBar.stylerX);
	}

	animateInertia(velocity) {
		chain(
			inertia({
				min: 0,
				max: this.rightBar.ref.current.offsetWidth,
				from: this.rightBar.styler.get('x'),
				velocity: Math.max(Math.min(velocity, 1700), -1700)
			}).while(v => 0 <= v && v <= this.rightBar.ref.current.offsetWidth),
			action(action => {
				if (velocity > 0) {
					this.setState({ opened: false });
					this.rightBar.stylerX.update(this.rightBar.ref.current.offsetWidth);
				} else {
					this.setState({ opened: true });
					this.rightBar.stylerX.update(0);
				}
				this.rightBar.inProgress = false;
				action.complete();
			})
		).start(this.rightBar.stylerX);
	}

	onOpen() {
		document.body.style.overflowY = 'hidden';

		if (this.listeners.directionSwipeStart) this.listeners.directionSwipeStart.stop();
		this.listeners.directionSwipeStart = listen(document, 'touchstart').start(e => {
			this.swipeDirection.x = e.touches[0].clientX;
			this.swipeDirection.y = e.touches[0].clientY;
			this.swipeDirection.evaluationFinished = false;
		});

		if (this.listeners.directionSwipeMove) this.listeners.directionSwipeMove.stop();
		this.listeners.directionSwipeMove = listen(document, 'touchmove').start(e => {
			if (this.swipeDirection.evaluationFinished) return;
			const xDiff = Math.abs(this.swipeDirection.x - e.touches[0].clientX);
			const yDiff = Math.abs(this.swipeDirection.y - e.touches[0].clientY);
			this.swipeDirection.evaluationFinished = true;

			if (xDiff * 0.65 > yDiff) this.startSwiping();
		});
	}

	onClose() {
		document.body.style.overflowY = 'auto';

		if (this.listeners.directionSwipeStart) this.listeners.directionSwipeStart.stop();
		if (this.listeners.directionSwipeMove) this.listeners.directionSwipeMove.stop();
	}

	componentDidUpdate(prevProps, prevState) {
		if (!prevState.opened && this.state.opened) this.onOpen();
		if (prevState.opened && !this.state.opened) this.onClose();
	}

	componentWillUnmount() {
		if (this.rightBar.subscriber) this.rightBar.subscriber.unsubscribe();
		Object.keys(this.listeners).forEach(listener => {
			if (this.listeners[listener]) this.listeners[listener].stop();
		});
	}

	render() {
		return (
			<div id="app-layout">
				<div id="app-layout-content-wrapper" className={scopedStyles.contentWrapper}>
					{this.props.children}
				</div>

				<div id="fixed-right-bar" ref={this.rightBar.ref} className={`${scopedStyles.fixedRightBar} p-fixed d-flex`}>
					<div
						className={`${scopedStyles.rightBarHandlerContainer} p-absolute`}
						onMouseDown={this.startSwiping}
						onTouchStart={this.startSwiping}
						style={{ top: this.state.windowHeight / 2 }}
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

AppLayout.propTypes = {
	children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element]).isRequired
};

export default AppLayout;
