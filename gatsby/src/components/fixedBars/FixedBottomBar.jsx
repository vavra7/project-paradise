import React, { Component } from 'react';
import MobileBottomMenu from '../menus/MobileBottomMenu';
import scopedStyles from './FixedBottomBar.module.scss';
import { styler, value } from 'popmotion';
import { event } from '../../events';
import { EVENTS } from '../../events/types';
import { connect } from 'react-redux';
import BREAKPOINTS from '../../styles/base/_breakpoints.scss';

const EXTRA_OFFSET = 50;
const SPEED_MODIFIER = 0.2;

class FixedBottomBar extends Component {
	//#region [ constructor ]

	constructor(props) {
		super(props);

		this.state = {
			active: true
		};

		this.ref = React.createRef();
		this.styler = null;
		this.stylerY = null;
		this.maxY = 0;

		event.listen(EVENTS.FIXED_BARS.RIGHT_BAR_UPDATE, rightBarProgress => this.onRightBar(rightBarProgress));
	}

	//#endregion

	updateActive() {
		if (this.props.windowWidth <= BREAKPOINTS.SM_MAX && !this.state.active) {
			this.setState({
				active: true
			});
		}
		if (this.props.windowWidth > BREAKPOINTS.SM_MAX && this.state.active) {
			this.setState({
				active: false
			});
		}
	}

	onRightBar(rightBarProgress) {
		if (!this.state.active || !this.ref.current) return;

		const v = rightBarProgress * SPEED_MODIFIER;

		if (this.maxY < v || v < 0) return;

		this.stylerY.update(v);
	}

	//#region [ lifeCycleMethods ]

	componentDidMount() {
		this.updateActive();
		this.styler = styler(this.ref.current);
		this.stylerY = value(0, v => this.styler.set('y', v));
		this.maxY = this.ref.current.offsetHeight + EXTRA_OFFSET;
	}

	componentDidUpdate(prevProps) {
		if (prevProps.windowWidth !== this.props.windowWidth) this.updateActive();
	}

	//#endregion

	render() {
		return (
			<div
				id="fixed-bottom-bar"
				ref={this.ref}
				className={`${scopedStyles.fixedBottomBar} ${
					!this.state.active ? 'hide' : ''
				} p-fixed d-flex jc-flex-end fd-column bg-white shadow-t-3 line-t-2`}
			>
				<MobileBottomMenu />
			</div>
		);
	}
}

const mapStateToProps = state => ({
	windowWidth: state.app.width
});

export default connect(
	mapStateToProps,
	null
)(FixedBottomBar);
