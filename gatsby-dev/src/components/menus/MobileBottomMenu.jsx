import React, { Component } from 'react';
import scopedStyles from './MobileBottomMenu.module.scss';
import { Link } from 'gatsby';
import RippleEffect from '../commons/buttons/ripple/RippleEffect';

class MobileBottomMenu extends Component {
	render() {
		return (
			<nav id="mobile-bottom-menu">
				<ul className={`${scopedStyles.menuWrapper} d-flex jc-space-around`}>
					<li>
						{/* <RippleEffect> */}
						<Link to="/">
							<i className="icon-home"></i>
							<span>Domů</span>
						</Link>
						{/* </RippleEffect> */}
					</li>
					<li>
						{/* <RippleEffect> */}
						<Link to="/test">
							<i className="icon-user-friends"></i>
							<span>O nás</span>
						</Link>
						{/* </RippleEffect> */}
					</li>
					<li>
						{/* <RippleEffect> */}
						<Link to="/test2">
							<i className="icon-umbrella-beach"></i>
							<span>Dovolené</span>
						</Link>
						{/* </RippleEffect> */}
					</li>

					<li>
						{/* <RippleEffect> */}
						<Link to="/">
							<i className="icon-shopping-cart"></i>
							<span>eShop</span>
						</Link>
						{/* </RippleEffect> */}
					</li>

					<li>
						{/* <RippleEffect> */}
						<Link to="/">
							<i className="icon-envelope"></i>
							<span>Kontakt</span>
						</Link>
						{/* </RippleEffect> */}
					</li>
				</ul>
			</nav>
		);
	}
}

export default MobileBottomMenu;
