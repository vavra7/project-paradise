import React from 'react';
import scopedStyles from './MobileBottomMenu.module.scss';
import { useStaticQuery, Link, graphql } from 'gatsby';
import RippleEffect from '../commons/buttons/ripple/RippleEffect';

const NUMBER_OF_ITEMS = 5;

const MobileBottomMenu = () => {
	const data = useStaticQuery(
		graphql`
			query {
				wpMenu(locationSlug: { eq: "mobile_bottom_menu" }) {
					id
					locationSlug
					items {
						wpId
						title
						type
						menuOrder
						url
						path
						menuOrder
						internal
						icon
					}
				}
			}
		`
	);

	if (!data.wpMenu) return <></>;

	const menuItems = data.wpMenu.items.slice(0, NUMBER_OF_ITEMS);
	const getPath = menuItem => {
		return menuItem.type === 'post' ? `/post${menuItem.path}` : menuItem.path;
	};

	return (
		<nav className="mobile-bottom-menu">
			<ul className={`${scopedStyles.menuWrapper} d-flex jc-space-around`}>
				{menuItems.map(item => (
					<li key={item.wpId}>
						<RippleEffect>
							{item.internal ? (
								<Link to={getPath(item)}>
									<i className={item.icon ? item.icon : 'icon-arrow-circle-right'}></i>
									<span>{item.title}</span>
								</Link>
							) : (
								<a href={item.url} target="_blank" rel="noopener noreferrer">
									<i className={item.icon ? item.icon : 'icon-arrow-circle-right'}></i>
									<span>{item.title}</span>
								</a>
							)}
						</RippleEffect>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default MobileBottomMenu;
