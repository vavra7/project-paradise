import React, { Component } from 'react';
import { connect } from 'react-redux';
import { appWidthHeight } from '../../../actions/appRootActions';
import { listen } from 'popmotion';

export class AppRootHandler extends Component {
	constructor(props) {
		super(props);

		this.listeners = {};
	}

	componentDidMount() {
		this.listeners.resize = listen(window, 'resize').start(e => {
			this.props.appWidthHeight(window.innerWidth, window.innerHeight);
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

const mapStateToProps = state => ({});

const mapDispatchToProps = {
	appWidthHeight
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AppRootHandler);
