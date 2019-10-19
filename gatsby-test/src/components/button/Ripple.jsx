import React, { Component } from 'react';
import PropTypes from 'prop-types';
import scopedStyles from './Ripple.module.scss';

const DURATION = 230;

class Ripple extends Component {
	static propTypes = {
		onRequestRemove: PropTypes.func.isRequired
	};

	constructor(props) {
		super(props);
		this.state = { in: false, out: false };
	}

	componentDidMount() {
		setTimeout(() => {
			this.setState({ in: true, out: false });
			setTimeout(() => {
				this.setState({ in: false, out: true });
				setTimeout(() => {
					this.props.onRequestRemove();
				}, DURATION);
			},150);
		}, 15);
	}

	render() {
		let classes = `${scopedStyles.Ripple}`;

		if (this.state.in) {
			classes = `${classes} ${scopedStyles.RippleIn}`;
		}
		if (this.state.out) {
			classes = `${classes} ${scopedStyles.RippleOut}`;
		}

		const style = {};
		if (this.props.top) style.top = this.props.top;
		if (this.props.left) style.left = this.props.left;

		return <div className={classes} style={style} />;
	}
}

export default Ripple;
