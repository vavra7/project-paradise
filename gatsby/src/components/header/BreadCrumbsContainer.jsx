import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';
import { PAGE_STATES } from '../../enums';

function BreadCrumbsContainer(props) {
	const data = useStaticQuery(
		graphql`
			query {
				allWpPage(filter: { states: {regex: "/\\w+/i"}}) {
					edges {
						node {
							path
							title
							states
						}
					}
				}
			}
		`
	);
	const pagesWithState = data.allWpPage.edges.map(node => node.node);
	const pageOnFront = pagesWithState.find(page => page.states.includes(PAGE_STATES.PAGE_ON_FRONT));
	const pageForPosts = pagesWithState.find(page => page.states.includes(PAGE_STATES.PAGE_FOR_POSTS));

	const commonLevel = (to, title) => {
		return (
			<>
				<Link to={to}>{title}</Link> >{' '}
			</>
		);
	};

	const homeLevel = () => {
		let homeLevel;

		if (pageOnFront) {
			homeLevel = commonLevel(pageOnFront.path, pageOnFront.title);
		} else {
			homeLevel = commonLevel('/', 'Domů');
		}

		return homeLevel;
	};

	return (
		<div id="bread-crumbs-container" className="container my-3">
			{homeLevel()}
			{pageForPosts && commonLevel(pageForPosts.path, pageForPosts.title)}
			{props.current}
		</div>
	);
}

BreadCrumbsContainer.propTypes = {
	current: PropTypes.string.isRequired
};

export default BreadCrumbsContainer;
