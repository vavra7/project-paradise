import React, { Component } from 'react';
import scopedStyles from './animation.module.scss';
import { inertia, styler, listen, value } from 'popmotion';

class animation extends Component {
	constructor() {
		super();

		this.box = React.createRef();

		this.test = this.test.bind(this);

		this.animation = null;
		this.val = null;
	}

	test() {
		console.log(this.test.getVelocity());
	}

	componentDidMount() {
		listen(this.box.current, 'touchstart mousedown').start(() => {
			const el = this.box.current;
			const elStyler = styler(el);
			const elStylerX = value(0, v => elStyler.set('x', v));

			this.test = elStylerX;

			inertia({
				from: 0,
				velocity: 600
			}).start(elStylerX);
		});
	}

	render() {
		return (
			<div>
				<button onClick={this.test}>test</button>

				<div className={scopedStyles.box} ref={this.box}></div>
			</div>
		);
	}
}

export default animation;
