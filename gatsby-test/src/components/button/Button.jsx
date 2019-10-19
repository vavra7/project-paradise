import React, { Component } from 'react';
import PropTypes from 'prop-types';
import scopedStyles from './Button.module.scss';
import Ripple from './Ripple';
import MainMenu from '../navigation/MainMenu';

class Button extends Component {
	static propTypes = {
		counter: PropTypes.func
	};

	constructor(props) {
		super(props);
		this.state = { ripples: [] };
	}

	render() {
		return (
			<div
				id="Button"
				className={scopedStyles.Button}
				onClick={e => {
					this.props.counter();
					const left = e.pageX - e.currentTarget.offsetLeft;
					const top = e.pageY - e.currentTarget.offsetTop;
					const id = Math.random().toString();
					const ripples = [...this.state.ripples, { left, top, id }];
					this.setState({ ripples });
				}}
			>
				{this.props.children}
				{this.state.ripples.map(({ left, top, id }) => {
					return (
						<Ripple
							left={`${left}px`}
							top={`${top}px`}
							key={id}
							onRequestRemove={() => {
								this.setState({ ripples: this.state.ripples.filter(ripple => ripple.id !== id) });
							}}
						/>
					);
				})}
			</div>
		);
	}
}

export default Button;
