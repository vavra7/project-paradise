import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import scopedStyles from './DesktopTopMenu.module.scss';

function DesktopTopMenu() {
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

	if (!data.wpMenu) return <></>;

	const menuItems = data.wpMenu.items;

	return (
		<nav className="desktop-top-menu">
			<ul className={scopedStyles.menuWrapper}>
				{menuItems.map(item => (
					<li key={item.wpId}>
						{item.internal ? (
							<Link to={item.path}>{item.title}</Link>
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
}

export default DesktopTopMenu;
