import React, { Component } from 'react';
import PropTypes from 'prop-types';
import scopedStyles from './FlatButton.module.scss';
import Ripple from './ripple/Ripple';

class FlatButton extends Component {
	static propTypes = {
		children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element, PropTypes.string])
			.isRequired
	};

	constructor(props) {
		super(props);
		this.state = { ripples: [] };
	}

	addRipple(e) {
		const newRipple = {
			top: e.clientY - Math.round(e.currentTarget.getBoundingClientRect().top),
			left: e.clientX - Math.round(e.currentTarget.getBoundingClientRect().left),
			id: Math.random().toString()
		};

		this.setState({ ripples: [...this.state.ripples, newRipple] });
	}

	onRemoveRipple(id) {
		this.setState({ ripples: this.state.ripples.filter(ripple => ripple.id !== id) });
	}

	render() {
		return (
			<div className={`${scopedStyles.flatButton} d-flex fg-1 ai-center jc-center`} onClick={e => this.addRipple(e)}>
				{this.state.ripples.map(({ top, left, id }) => (
					<Ripple top={top} left={left} key={id} removeRipple={() => this.onRemoveRipple(id)} />
				))}

				{this.props.children}
			</div>
		);
	}
}

export default FlatButton;
