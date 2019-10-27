import React, { Component } from 'react';
import { connect } from 'react-redux';
import { appWidthHeight, appSwipeAxis } from '../../../actions/appRootActions';
import { listen } from 'popmotion';

export class AppRootHandler extends Component {
	constructor(props) {
		super(props);

		this.listeners = {};
		this.swipeAxis = {
			evaluationFinished: false,
			xStart: null,
			yStart: null
		};
	}

	swipeAxisStart(e) {
		this.swipeAxis.xStart = Math.round(e.touches[0].clientX);
		this.swipeAxis.yStart = Math.round(e.touches[0].clientY);
		this.swipeAxis.evaluationFinished = false;
	}

	swipeAxisCalculate(e) {
		if (this.swipeAxis.evaluationFinished) return;

		const xDiff = Math.abs(this.swipeAxis.xStart - Math.round(e.touches[0].clientX));
		const yDiff = Math.abs(this.swipeAxis.yStart - Math.round(e.touches[0].clientY));

		let x = false;
		let y = false;

		if (xDiff * 0.75 > yDiff) x = true;
		if (yDiff * 0.75 > xDiff) y = true;

		this.props.appSwipeAxis(x, y);
		this.swipeAxis.evaluationFinished = true;
	}

	swipeAxisReset() {
		if (!this.props.swipeAxis.x && !this.props.swipeAxis.y) return;
		this.props.appSwipeAxis(false, false);
	}

	componentDidMount() {
		this.listeners.resize = listen(window, 'resize').start(e => {
			this.props.appWidthHeight(window.innerWidth, window.innerHeight);
		});

		this.listeners.touchstart = listen(document, 'touchstart').start(e => {
			this.swipeAxisStart(e);
		});

		this.listeners.touchmove = listen(document, 'touchmove').start(e => {
			this.swipeAxisCalculate(e);
		});

		this.listeners.touchend = listen(document, 'touchend').start(() => {
			this.swipeAxisReset();
		});
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
	swipeAxis: state.app.swipeAxis
});

const mapDispatchToProps = {
	appWidthHeight,
	appSwipeAxis
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AppRootHandler);
