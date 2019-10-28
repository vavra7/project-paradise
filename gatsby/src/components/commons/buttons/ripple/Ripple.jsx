import React, { Component } from 'react';
import PropTypes from 'prop-types';
import scopedStyles from './Ripple.module.scss';

const SAFETY_DURATION = 15;

class Ripple extends Component {
	static propTypes = {
		top: PropTypes.number.isRequired,
		left: PropTypes.number.isRequired,
		removeRipple: PropTypes.func.isRequired
	};

	constructor(props) {
		super(props);
		this.state = { in: false, out: false };
	}

	componentDidMount() {
		setTimeout(() => {
			this.setState({ in: true, out: false });
			setTimeout(() => {
				this.setState({ in: true, out: true });
				setTimeout(() => {
					this.props.removeRipple();
				}, scopedStyles.PHASE_DURATION);
			}, scopedStyles.PHASE_DURATION);
		}, SAFETY_DURATION);
	}

	render() {
		let rippleClasses = scopedStyles.ripple;
		if (this.state.in) rippleClasses = `${rippleClasses} ${scopedStyles.rippleIn}`;
		if (this.state.out) rippleClasses = `${rippleClasses} ${scopedStyles.rippleOut}`;

		const style = { top: `${this.props.top}px`, left: `${this.props.left}px` };

		return <div className={rippleClasses} style={style}></div>;
	}
}

export default Ripple;
