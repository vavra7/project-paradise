import React from 'react';
import scopedStyles from './MobileBottomMenu.module.scss';
import { Link } from 'gatsby';

const MobileBottomMenu = () => {
	return (
		<nav id="mobile-bottom-menu">
			<ul className={`${scopedStyles.menuWrapper} d-flex jc-space-around`}>
				<li>
					<Link to="/">
						<i className="icon-home"></i>
						<span>Domů</span>
					</Link>
				</li>

				<li>
					<Link to="/">
						<i className="icon-user-friends"></i>
						<span>O nás</span>
					</Link>
				</li>

				<li>
					<Link to="/">
						<i className="icon-umbrella-beach"></i>
						<span>Dovolené</span>
					</Link>
				</li>

				<li>
					<Link to="/">
						<i className="icon-shopping-cart"></i>
						<span>eShop</span>
					</Link>
				</li>

				<li>
					<Link to="/">
						<i className="icon-envelope"></i>
						<span>Kontakt</span>
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default MobileBottomMenu;
