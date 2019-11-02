import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import scopedStyles from './DesktopTopMenu.module.scss';

const DesktopTopMenu = () => {
	const data = useStaticQuery(
		graphql`
			query {
				wpMenu(locationSlug: { eq: "desktop_top_menu" }) {
					items {
						wpId
						title
						url
						path
						internal
						type
					}
				}
			}
		`
	);
	const menuItems = data.wpMenu.items;
	const getPath = menuItem => {
		return menuItem.type === 'post' ? `/post${menuItem.path}` : menuItem.path;
	};

	return (
		<nav className="desktop-top-menu">
			<ul className={scopedStyles.menuWrapper}>
				{menuItems.map(item => (
					<li key={item.wpId}>
						{item.internal ? (
							<Link to={getPath(item)}>{item.title}</Link>
						) : (
							<a href={item.url} target="_blank" rel="noopener noreferrer">
								{item.title}
							</a>
						)}
					</li>
				))}
			</ul>
		</nav>
	);
};

export default DesktopTopMenu;
