import React from 'react';
import scopedStyles from './MobileBottomMenu.module.scss';
import { Link } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUmbrellaBeach, faShoppingCart, faUserFriends, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const MobileBottomMenu = () => {
	return (
		<nav id="mobile-bottom-menu">
			<ul className={scopedStyles.menuWrapper}>
				<li>
					<Link to="/">
						<FontAwesomeIcon icon={faHome} />
						<span>Domů</span>
					</Link>
				</li>

				<li>
					<Link to="/">
						<FontAwesomeIcon icon={faUserFriends} />
						<span>O nás</span>
					</Link>
				</li>

				<li>
					<Link to="/">
						<FontAwesomeIcon icon={faUmbrellaBeach} />
						<span>Dovolené</span>
					</Link>
				</li>

				<li>
					<Link to="/">
						<FontAwesomeIcon icon={faShoppingCart} />
						<span>eShop</span>
					</Link>
				</li>

				<li>
					<Link to="test">
						<FontAwesomeIcon icon={faEnvelope} />
						<span>Kontakt</span>
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default MobileBottomMenu;
