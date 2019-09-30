import React, { Component } from 'react';
import scopedStyle from './Slider.module.scss';
import { tween, styler, easing, listen } from 'popmotion';

const animationDuration = 1000;
const animationEasing = easing.easeIn;
const slideShowInterval = 4000;

const items = [
	{
		title: 'title1',
		body: 'body1'
	},
	{
		title: 'title2',
		body: 'body2'
	},
	{
		title: 'title3',
		body: 'body3'
	},
	{
		title: 'title4',
		body: 'body4'
	}
];

const prevAnimate = (node, complete) =>
	tween({
		to: {
			x: `${100 / items.length}%`
		},
		duration: animationDuration,
		ease: animationEasing
	}).start({
		update: v => styler(node).set(v),
		complete: complete
	});

const nextAnimate = (node, complete) =>
	tween({
		to: {
			x: `-${100 / items.length}%`
		},
		duration: animationDuration,
		ease: animationEasing
	}).start({
		update: v => styler(node).set(v),
		complete: complete
	});

const getSwipeDirection = (startX, startY, endX, endY) => {
	startX = parseInt(startX);
	startY = parseInt(startY);
	endX = parseInt(endX);
	endY = parseInt(endY);

	const diffX = Math.abs(startX - endX);
	const diffY = Math.abs(startY - endY);

	if (diffX < diffY || diffX < 50) return false;

	if (startX < endX) {
		return 'right';
	} else {
		return 'left';
	}
};

class SliderV3 extends Component {
	constructor() {
		super();
		this.state = {
			currentSlide: 1,
			forwardDirection: true
		};

		this.innerWrapper = React.createRef();
		this.nextSlide = this.nextSlide.bind(this);
		this.prevSlide = this.prevSlide.bind(this);
		this.startSlideShow = this.startSlideShow.bind(this);
		this.stopSlideShow = this.stopSlideShow.bind(this);
		this.animation = null;
		this.swiping = null;
		this.slideShow = null;

		this.swiping = {
			startListener: null,
			stopListener: null,
			inProgress: false,
			startPoint: {
				x: null,
				y: null
			},
			stopPoint: {
				x: null,
				y: null
			}
		};
	}

	slideCounter() {
		const slide = this.state.currentSlide;

		if (this.state.forwardDirection) {
			if (slide + 1 > items.length) {
				this.setState({ currentSlide: 1 });
			} else {
				this.setState({ currentSlide: slide + 1 });
			}
		} else {
			if (slide - 1 < 1) {
				this.setState({ currentSlide: items.length });
			} else {
				this.setState({ currentSlide: slide - 1 });
			}
		}
	}

	prevSlide() {
		const node = this.innerWrapper.current;

		if (this.animation && this.animation.isActive()) return;
		if (this.state.forwardDirection) {
			node.appendChild(node.firstElementChild);
			this.setState({ forwardDirection: false });
		}

		const onComplete = () => {
			node.prepend(node.lastElementChild);
			styler(node).set('x', 0);

			this.slideCounter();
		};

		this.animation = prevAnimate(node, onComplete);
	}

	nextSlide() {
		const node = this.innerWrapper.current;

		if (this.animation && this.animation.isActive()) return;
		if (!this.state.forwardDirection) {
			node.prepend(node.lastElementChild);
			this.setState({ forwardDirection: true });
		}

		const onComplete = () => {
			node.appendChild(node.firstElementChild);
			styler(node).set('x', 0);

			this.slideCounter();
		};

		this.animation = nextAnimate(node, onComplete);
	}

	startSlideShow() {
		this.slideShow = setInterval(() => {
			this.nextSlide();
		}, slideShowInterval);
	}

	stopSlideShow() {
		clearInterval(this.slideShow);
	}

	startSwipeListeners() {
		let direction = null;

		this.swiping.startListener = listen(this.innerWrapper.current, 'touchstart mousedown').start(e => {
			this.swiping.inProgress = true;
			if (e.type === 'touchstart') {
				this.swiping.startPoint.x = e.touches[0].clientX.toFixed(0);
				this.swiping.startPoint.y = e.touches[0].clientY.toFixed(0);
			} else {
				this.swiping.startPoint.x = e.clientX;
				this.swiping.startPoint.y = e.clientY;
			}
		});

		this.swiping.stopListener = listen(document, 'touchend mouseup').start(e => {
			if (this.swiping.inProgress) {
				if (e.type === 'touchend') {
					this.swiping.stopPoint.x = e.changedTouches[0].clientX.toFixed(0);
					this.swiping.stopPoint.y = e.changedTouches[0].clientY.toFixed(0);
				} else {
					this.swiping.stopPoint.x = e.clientX;
					this.swiping.stopPoint.y = e.clientY;
				}
				this.swiping.inProgress = false;
				direction = getSwipeDirection(
					this.swiping.startPoint.x,
					this.swiping.startPoint.y,
					this.swiping.stopPoint.x,
					this.swiping.stopPoint.y
				);

				if (!direction) return;

				if (direction === 'right') {
					this.prevSlide();
				} else {
					this.nextSlide();
				}
			}
		});
	}

	stopSwipeListeners() {
		if (this.swiping.startListener) this.swiping.startListener.stop();
		if (this.swiping.stopListener) this.swiping.stopListener.stop();
	}

	componentDidMount() {
		this.startSlideShow();
		this.startSwipeListeners();
	}

	componentWillUnmount() {
		this.stopSlideShow();
		this.stopSwipeListeners();
	}

	render() {
		return (
			<div id="front-slider" className={scopedStyle.slider}>
				<div
					className={scopedStyle.outerWrapper}
					onMouseOver={this.stopSlideShow}
					onMouseOut={this.startSlideShow}
					style={{ justifyContent: this.state.forwardDirection ? 'flex-start' : 'flex-end' }}
				>
					<div ref={this.innerWrapper} className={scopedStyle.innerWrapper} style={{ width: `${100 * items.length}%` }}>
						{items.map((slide, index) => {
							return (
								<section key={index} className={scopedStyle.slide} style={{ width: `${100 / items.length}%` }}>
									<div>
										<h1>{slide.title}</h1>
										<p>{slide.body}</p>
									</div>
								</section>
							);
						})}
					</div>

					<div className="controls">
						<span className={`${scopedStyle.arrow} ${scopedStyle.prev}`} onClick={this.prevSlide}>
							prev
						</span>

						<span className={`${scopedStyle.arrow} ${scopedStyle.next}`} onClick={this.nextSlide}>
							next
						</span>
					</div>
				</div>

				<button onClick={() => this.animation.stop()}>stop</button>

				<button onClick={() => this.animation.resume()}>resume</button>

				<span>{this.state.currentSlide}</span>
				<div
					style={{
						height: '500px'
					}}
				>
					<pre>{JSON.stringify(this.state.swiping, null, 2)}</pre>
				</div>
			</div>
		);
	}
}

export default SliderV3;
