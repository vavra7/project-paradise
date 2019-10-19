import React, { Component } from 'react';
import Button from '../components/button/Button';

export default class ripplePage extends Component {
	constructor(props) {
		super(props);
		this.state = { count: 0 };
	}

	render() {
		return (
			<div style={{background: 'black'}}>
				<Button counter={() => this.setState({ count: this.state.count + 1 })}>Pořádný tlačítko</Button>
				<p>
					Clicks: <strong>{this.state.count}</strong>
				</p>
			</div>
		);
	}
}
