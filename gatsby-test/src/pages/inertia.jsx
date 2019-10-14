import React, { Component } from 'react';
import { inertia, styler, listen, pointer, value, calc } from 'popmotion';
import scopedStyles from './inertia.module.scss';
import { motion } from "framer-motion"

class Inertia extends Component {
	constructor() {
		super();

		this.playground = React.createRef();
		this.square = React.createRef();
		this.test = this.test.bind(this);
		this.inertia = null;
		this.pokus = null;

		const squareStyler = null;
		const squareStylerX = null;
	}

	test() {
		console.log(this.squareStylerX);
		// this.squareStylerX.stop();
	}

	componentDidMount() {
		this.squareStyler = styler(this.square.current);
		// this.squareStylerX = value(0, v => this.squareStyler.set('x', v));
		this.squareStylerX = value(0, v => this.squareStyler.set('x', v));

		this.squareStylerX.subscribe({
			// update: v => console.log(v),
			complete: () => {
				console.log('COMPLETED');
				this.squareStylerX.stop();
			}
		});

		listen(this.square.current, 'touchstart mousedown').start(() => {
			const maxBoundary = this.playground.current.offsetWidth - this.square.current.offsetWidth;
			const calcOverDrag = (min, max, tug) => calc.getValueFromProgress(min, max, tug);

			const overDrag = v => {
				if (v < 0) {
					return calcOverDrag(0, v, 0.05);
				} else if (maxBoundary < v) {
					return calcOverDrag(maxBoundary, v, 0.3);
				} else {
					return v;
				}
			};

			pointer({
				x: this.squareStyler.get('x')
			})
				.pipe(
					({ x }) => x,
					overDrag
				)
				.start(this.squareStylerX);
		});

		listen(document, 'touchend mouseup').start(() => {
			const maxBoundary = this.playground.current.offsetWidth - this.square.current.offsetWidth;
			console.log(this.squareStylerX.getVelocity());

			this.inertia = inertia({
				min: 0,
				max: maxBoundary,
				from: this.squareStyler.get('x'),
				velocity: this.squareStylerX.getVelocity()
			}).start(this.squareStylerX);
		});
	}

	render() {
		return (
			<div>
				<h5>Inertia</h5>

				<div className="container mt-5">
					<div className="row">
						<div className="col-xs-12">
							<div ref={this.playground} className={scopedStyles.playground}>
								<div ref={this.square} className={scopedStyles.square}></div>
							</div>
						</div>
					</div>

					<button onClick={this.test}>test</button>
				</div>
			</div>
		);
	}
}

export default Inertia;
