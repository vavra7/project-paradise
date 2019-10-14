import React, { Component } from 'react';
import PropTypes from 'prop-types';
import scopedStyles from './AppLayout.module.scss';
import { tween, easing, styler, listen, value, pointer, calc, inertia } from 'popmotion';
import MobileBottomMenu from '../menus/MobileBottomMenu';

class AppLayout extends Component {
	constructor(props) {
		super(props);
		this.state = {
			inProgress: false,
			opened: false
		};
		this.elRightBar = React.createRef();

		this.startSwiping = this.startSwiping.bind(this);
		this.finishSwiping = this.finishSwiping.bind(this);
		this.test = this.test.bind(this);

		this.lastWindowWidth = null;
		// this.lastXTouch = null;
		// this.lastYTouch = null;

		this.listeners = {
			resize: null
		};
		this.rightBar = {
			opened: false,
			inProgress: false,
			styler: null,
			stylerXVal: null,
			maxBoundary: null,
			swiping: null,
			animation: null
		};
	}

	test() {
		console.log(this);
		this.rightBar.swiping.stop();
	}

	startSwiping() {
		console.log('startSwiping');
		this.rightBar.inProgress = true;
		this.setState({ inProgress: true });
		this.rightBar.opened = true;
		this.setState({ opened: true });

		if (this.rightBar.swiping) this.rightBar.swiping.stop();
		if (this.rightBar.animation) this.rightBar.animation.stop();

		const overDragPipe = v => {
			if (v < 0) {
				return calc.getValueFromProgress(0, v, 0.15);
			} else if (this.rightBar.maxBoundary < v) {
				return calc.getValueFromProgress(this.rightBar.maxBoundary, v, 0.15);
			} else {
				return v;
			}
		};

		this.rightBar.swiping = pointer({ x: this.rightBar.styler.get('x') })
			.pipe(
				({ x }) => x,
				overDragPipe
			)
			.start({
				update: v => this.rightBar.stylerXVal.update(v)
			});
	}

	finishSwiping() {
		console.log('finishSwiping');
		if (!this.rightBar.inProgress && !this.rightBar.opened) return;
		if (this.rightBar.swiping) this.rightBar.swiping.stop();

		const velocity = this.rightBar.stylerXVal.getVelocity();

		if (velocity < -600 || 600 < velocity) {
			this.animateInertia(velocity);
		} else if (velocity === 0) {
			const progress = calc.getProgressFromValue(0, this.rightBar.maxBoundary, this.rightBar.stylerXVal.get());
			const from = this.rightBar.stylerXVal.get();
			const to = progress < 0.5 ? 0 : this.rightBar.maxBoundary;

			this.animateTween(from, to, 200);
		} else {
			const from = this.rightBar.stylerXVal.get();
			const to = velocity < 0 ? 0 : this.rightBar.maxBoundary;

			this.animateTween(from, to, 500);
		}
	}

	animateInertia(velocity) {
		console.log('animateInertia');
		const boundariesPipe = v => {
			if (v < 0) {
				return 0;
			} else if (this.rightBar.maxBoundary < v) {
				return this.rightBar.maxBoundary;
			} else {
				return v;
			}
		};

		if (this.rightBar.animation) this.rightBar.animation.stop();

		this.rightBar.animation = inertia({
			min: 0,
			max: this.rightBar.maxBoundary,
			from: this.rightBar.stylerXVal.get(),
			velocity: Math.max(Math.min(velocity, 1700), -1700),
			bounceStiffness: 400,
			bounceDamping: 100000
		})
			.pipe(boundariesPipe)
			.start({
				update: v => this.rightBar.stylerXVal.update(v),
				complete: () => {
					this.rightBar.opened = !this.rightBar.styler.get('x');
					this.setState({ opened: !this.rightBar.styler.get('x') });
					this.rightBar.inProgress = false;
					this.setState({ inProgress: false });
				}
			});
	}

	animateTween(from, to, duration) {
		console.log('animateTween');
		if (this.rightBar.animation) this.rightBar.animation.stop();

		this.rightBar.animation = tween({
			from: from,
			to: to,
			duration: duration,
			ease: easing.linear
		}).start({
			update: v => this.rightBar.stylerXVal.update(v),
			complete: () => {
				this.rightBar.opened = !this.rightBar.styler.get('x');
				this.setState({ opened: !this.rightBar.styler.get('x') });
				this.rightBar.inProgress = false;
				this.setState({ inProgress: false });
			}
		});
	}

	componentDidMount() {
		this.lastWindowWidth = window.innerWidth;
		this.rightBar.styler = styler(this.elRightBar.current);
		this.rightBar.stylerXVal = value(0, v => this.rightBar.styler.set('x', v));
		this.rightBar.maxBoundary = this.elRightBar.current.offsetWidth;
		this.rightBar.styler.set('x', this.elRightBar.current.offsetWidth);

		this.listeners.resize = listen(window, 'resize').start(() => {
			if (this.lastWindowWidth !== window.innerWidth) {
				this.rightBar.styler.set('x', this.elRightBar.current.offsetWidth);
				this.rightBar.maxBoundary = this.elRightBar.current.offsetWidth;
			}
		});

		// this.rightBar.stylerXVal.subscribe({
		// 	update: v => console.log(this.rightBar.stylerXVal)
		// });

		// listen(document, 'touchstart').start(e => {
		// 	this.lastXTouch = e.touches[0].clientX;
		// 	this.lastYTouch = e.touches[0].clientY;
		// });

		// listen(document, 'touchmove').start(e => {
		// 	const changeX = Math.abs(this.lastXTouch - e.touches[0].clientX);
		// 	const changeY = Math.abs(this.lastYTouch - e.touches[0].clientY);

		// 	let moveX = null;
		// 	let moveY = null;

		// 	if (changeX > changeY) {
		// 		moveX = true;
		// 		moveY = false;
		// 	} else if (changeX < changeY) {
		// 		moveX = false;
		// 		moveY = true;
		// 	} else if (moveX > 0 && moveX === moveY) {
		// 		moveX = true;
		// 		moveY = true;
		// 	} else {
		// 		moveX = false;
		// 		moveY = false;
		// 	}

		// 	console.log('X:', moveX, 'Y:', moveY);

		// 	this.lastXTouch = e.touches[0].clientX;
		// 	this.lastYTouch = e.touches[0].clientY;
		// });

		// listen(this.elHandlerContainer.current, 'touchstart mousedown').start(() => {
		// 	this.swipeRightBar();
		// });

		// this.listeners.touchEnd = listen(document, 'touchend mouseup').start(() => {
		// 	this.finishSwiping();
		// });
	}

	componentWillUnmount() {}

	render() {
		return (
			<div id="app-layout" onMouseUp={this.finishSwiping} onTouchEnd={this.finishSwiping}>
				<i className="icon-bars p-fixed ma-3" onClick={this.test}></i>

				<div>inProgress: {this.state.inProgress.toString()}</div>
				<div>opened: {this.state.opened.toString()}</div>

				<div id="app-layout-content-wrapper" className={scopedStyles.contentWrapper}>
					{this.props.children}
				</div>

				<div id="fixed-right-bar" ref={this.elRightBar} className={`${scopedStyles.fixedRightBar} p-fixed d-flex`}>
					<div
						ref={this.elHandlerContainer}
						className={`${scopedStyles.rightBarHandlerContainer} p-absolute`}
						onMouseDown={this.startSwiping}
						onTouchStart={this.startSwiping}
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
