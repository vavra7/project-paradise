import React, { Component } from 'react';
import MobileBottomMenu from '../menus/MobileBottomMenu';
import scopedStyles from './FixedBottomBar.module.scss';
import { styler, value } from 'popmotion';
import { event } from '../../events';
import { EVENTS } from '../../events/types';
import { connect } from 'react-redux';
import { setBottomBarEnabled } from '../../store/fixedBars/actions';
import BREAKPOINTS from '../../../../common-styles/modules/_breakpoints.scss';
import PropTypes from 'prop-types';

const EXTRA_OFFSET = 50;
const SPEED_MODIFIER = 0.2;

class FixedBottomBar extends Component {
	static propTypes = {
		windowWidth: PropTypes.number.isRequired,
		bottomBarEnabled: PropTypes.bool.isRequired,
		setBottomBarEnabled: PropTypes.func.isRequired
	};

	//#region [ constructor ]

	constructor(props) {
		super(props);

		this.ref = React.createRef();
		this.styler = null;
		this.stylerY = null;
		this.maxY = 0;

		event.listen(EVENTS.FIXED_BARS.RIGHT_BAR_UPDATE, rightBarProgress => this.onRightBar(rightBarProgress));
	}

	//#endregion

	updateEnabled() {
		if (this.props.windowWidth <= BREAKPOINTS.SM_MAX && !this.props.bottomBarEnabled) {
			this.props.setBottomBarEnabled(true);
		} else if (this.props.windowWidth > BREAKPOINTS.SM_MAX && this.props.bottomBarEnabled) {
			this.props.setBottomBarEnabled(false);
		}
	}

	onRightBar(rightBarProgress) {
		if (!this.props.bottomBarEnabled || !this.ref.current) return;

		const v = rightBarProgress * SPEED_MODIFIER;

		if (this.maxY < v || v < 0) return;

		this.stylerY.update(v);
	}

	//#region [ lifeCycleMethods ]

	componentDidMount() {
		this.updateEnabled();
		this.styler = styler(this.ref.current);
		this.stylerY = value(0, v => this.styler.set('y', v));
		this.maxY = this.ref.current.offsetHeight + EXTRA_OFFSET;
	}

	componentDidUpdate(prevProps) {
		if (prevProps.windowWidth !== this.props.windowWidth) this.updateEnabled();
	}

	//#endregion

	render() {
		return (
			<div
				id="fixed-bottom-bar"
				ref={this.ref}
				className={`${scopedStyles.fixedBottomBar} ${
					!this.props.bottomBarEnabled ? 'hide' : ''
				} p-fixed d-flex jc-flex-end fd-column bg-white shadow-t-3 line-t-2`}
			>
				<MobileBottomMenu />
			</div>
		);
	}
}

const mapStateToProps = state => ({
	windowWidth: state.appRoot.width,
	bottomBarEnabled:  state.fixedBars.bottomBarEnabled
});

const mapDispatchToProps = {
	setBottomBarEnabled
};

export default connect(mapStateToProps, mapDispatchToProps)(FixedBottomBar);
