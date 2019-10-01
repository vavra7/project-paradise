import React from 'react';
import { Link, StaticQuery, graphql } from 'gatsby';

const MainMenu = () => (
	<StaticQuery
		query={graphql`
			query {
				wpMenu(locationSlug: { eq: "main_menu" }) {
					items {
						wpId
						title
						url
						path
						internal
					}
				}
			}
		`}
		render={data => {
			if (!data.wpMenu) return;
			return (
				<ul>
					{data.wpMenu.items.map(item => {
						if (item.internal) {
							return (
								<li key={item.wpId}>
									<Link to={item.path}>{item.title}</Link>
								</li>
							);
						} else {
							return (
								<li key={item.wpId}>
									<a href={item.url} target="_blank" rel="noopener noreferrer">
										{item.title}
									</a>
								</li>
							);
						}
					})}
				</ul>
			);
		}}
	></StaticQuery>
);

export default MainMenu;
