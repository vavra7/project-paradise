import React, { Component } from 'react';
import scopedStyles from './MobileBottomMenu.module.scss';
import { Link } from 'gatsby';
import FlatButton from '../commons/buttons/FlatButton';

class MobileBottomMenu extends Component {
	render() {
		return (
			<nav id="mobile-bottom-menu">
				<ul className={`${scopedStyles.menuWrapper} d-flex jc-space-around`}>
					<li>
						<FlatButton>
							<Link to="/">
								<i className="icon-home"></i>
								<span>Domů</span>
							</Link>
						</FlatButton>
					</li>
					<li>
						<FlatButton>
							<Link to="/test">
								<i className="icon-user-friends"></i>
								<span>O nás</span>
							</Link>
						</FlatButton>
					</li>
					<li>
						<FlatButton>
							<Link to="/">
								<i className="icon-umbrella-beach"></i>
								<span>Dovolené</span>
							</Link>
						</FlatButton>
					</li>

					<li>
						<FlatButton>
							<Link to="/">
								<i className="icon-shopping-cart"></i>
								<span>eShop</span>
							</Link>
						</FlatButton>
					</li>

					<li>
						<FlatButton>
							<Link to="/">
								<i className="icon-envelope"></i>
								<span>Kontakt</span>
							</Link>
						</FlatButton>
					</li>
				</ul>
			</nav>
		);
	}
}

export default MobileBottomMenu;
