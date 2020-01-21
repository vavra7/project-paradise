import React, { Component } from 'react';
import { connect } from 'react-redux';
import MobileTopMenu from '../menus/MobileTopMenu';
import DesktopTopMenu from '../menus/DesktopTopMenu';
import scopedStyles from './FixedTopBars.module.scss';
import BREAKPOINTS from '../../../../common-styles/modules/_breakpoints.scss';
import { event } from '../../events';
import { EVENTS } from '../../events/types';
import { styler, value, tween, easing } from 'popmotion';
import Logo from '../commons/logo/Logo';
import PropTypes from 'prop-types';

const DESKTOP_REVEAL_POINT = 300;
const DESKTOP_BAR_EXTRA_OFFSET = 3;
const MOBILE_BAR_TWEEN_DURATION = 200;
const RIGHT_BAR_SPEED_MODIFIER = 0.2;

class FixedTopBars extends Component {
	static propTypes = {
		windowWidth: PropTypes.number.isRequired,
		rightBarActive: PropTypes.bool.isRequired
	};

	//#region [ constructor ]

	constructor(props) {
		super(props);

		this.state = {
			mobile: true,
			desktopBarActive: false
		};

		this.mobileTopBar = {
			ref: React.createRef(),
			styler: null,
			stylerY: null,
			minY: 0,
			onRightBar: false
		};

		this.prevPageYOffset = 0;

		event.listen(EVENTS.APP_ROOT.SWIPE_SCROLL_FINISH, () => this.mobileBarFinish());
		event.listen(EVENTS.FIXED_BARS.RIGHT_BAR_UPDATE, rightBarProgress => this.mobilBarOnRightBar(rightBarProgress));
		event.listen(EVENTS.APP_ROOT.SCROLL_UPDATE, () => {
			this.updateDesktopBarActive();
			this.mobileBarOnScroll();
		});
	}

	//#endregion

	updateMobileDesktop() {
		if (this.props.windowWidth <= BREAKPOINTS.SM_MAX && !this.state.mobile) {
			this.setState({
				mobile: true
			});
		}
		if (this.props.windowWidth > BREAKPOINTS.SM_MAX && this.state.mobile) {
			this.setState({
				mobile: false
			});
		}
	}

	//#region [ rgba(122, 249, 97, 0.04) ] Mobile Fixed Top Bar

	mobileBarOnScroll() {
		if (!this.state.mobile) return;

		const diff = this.prevPageYOffset - window.pageYOffset;
		const currentPosition = this.mobileTopBar.styler.get('y');
		this.prevPageYOffset = window.pageYOffset;

		if (currentPosition >= 0 && diff >= 0) return;
		if (currentPosition <= this.mobileTopBar.minY && diff <= 0) return;

		const progress = currentPosition + diff;
		this.mobileTopBar.stylerY.update(Math.max(Math.min(progress, 0), this.mobileTopBar.minY));
	}

	mobileBarFinish() {
		if (!this.state.mobile) return;

		const currentPosition = this.mobileTopBar.styler.get('y');

		if (currentPosition === 0 || currentPosition === this.mobileTopBar.minY) return;

		tween({
			from: currentPosition,
			to: 0,
			duration: MOBILE_BAR_TWEEN_DURATION,
			ease: easing.linear
		}).start(this.mobileTopBar.stylerY);
	}

	shouldOnRightBar() {
		if (!this.state.mobile) return;

		this.mobileTopBar.onRightBar = this.mobileTopBar.styler.get('y') === this.mobileTopBar.minY;
	}

	mobilBarOnRightBar(rightBarProgress) {
		if (!this.state.mobile || !this.mobileTopBar.onRightBar || !this.mobileTopBar.ref.current) return;

		const v = rightBarProgress * RIGHT_BAR_SPEED_MODIFIER + this.mobileTopBar.minY;

		if (0 < v) {
			if (this.mobileTopBar.styler.get('y') !== 0) this.mobileTopBar.styler.set('y', 0);
			return;
		} else {
			this.mobileTopBar.stylerY.update(v);
		}
		this.mobileTopBar.stylerY.update(v);
	}

	//#endregion

	//#region [ rgba(255, 242, 0, 0.04) ] Desktop Fixed Top Bar

	updateDesktopBarActive() {
		if (this.state.mobile) return;

		if (window.pageYOffset >= DESKTOP_REVEAL_POINT && !this.state.desktopBarActive) {
			this.setState({
				desktopBarActive: true
			});
		}

		if (window.pageYOffset < DESKTOP_REVEAL_POINT && this.state.desktopBarActive) {
			this.setState({
				desktopBarActive: false
			});
		}
	}

	//#endregion

	//#region [lifeCycleMethods] Life Cycle Methods

	UNSAFE_componentWillUpdate(nextProps) {
		if (!this.props.rightBarActive && nextProps.rightBarActive) this.shouldOnRightBar();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.windowWidth !== this.props.windowWidth) this.updateMobileDesktop();
	}

	componentDidMount() {
		this.updateMobileDesktop();
		this.updateDesktopBarActive();
		this.mobileTopBar.styler = styler(this.mobileTopBar.ref.current);
		this.mobileTopBar.stylerY = value(0, v => this.mobileTopBar.styler.set('y', v));
		this.mobileTopBar.minY = -this.mobileTopBar.ref.current.offsetHeight - DESKTOP_BAR_EXTRA_OFFSET;
	}

	//#endregion

	render() {
		return (
			<>
				<div
					id="mobile-fixed-top-bar"
					ref={this.mobileTopBar.ref}
					className={`${scopedStyles.fixedTopBar} ${scopedStyles.mobile} p-fixed d-flex ${
						this.state.mobile ? '' : 'hide'
					}`}
				>
					<div className="container-fluid d-flex jc-space-between ai-center">
						<Logo />
						<MobileTopMenu />
					</div>
				</div>

				<div
					id="desktop-fixed-top-bar"
					className={`${scopedStyles.fixedTopBar} ${scopedStyles.desktop} p-fixed ${this.state.mobile ? 'hide' : ''} ${
						this.state.desktopBarActive ? scopedStyles.desktopActive : ''
					}`}
				>
					<DesktopTopMenu></DesktopTopMenu>
				</div>
			</>
		);
	}
}

const mapStateToProps = state => ({
	windowWidth: state.appRoot.width,
	rightBarActive: state.fixedBars.rightBarActive
});

export default connect(mapStateToProps, null)(FixedTopBars);
