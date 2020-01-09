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
	const getPageOnFront = pagesWithState => {
		let _pageOnFront = pagesWithState.find(page => page.states.includes(PAGE_STATES.PAGE_ON_FRONT));

		if (!_pageOnFront) {
			_pageOnFront = {
				title: 'Domů',
				path: '/'
			};
		}

		return _pageOnFront;
	};

	const renderLevel = (title, to = null, useGoBetween = true) => {
		const goBetween = <> > </>;

		return (
			<>
				{useGoBetween && goBetween}
				{to ? <Link to={to}>{title}</Link> : title}
			</>
		);
	};

	const pagesWithState = data.allWpPage.edges.map(node => node.node);
	const pageOnFront = getPageOnFront(pagesWithState);
	const pageForPosts = pagesWithState.find(page => page.states.includes(PAGE_STATES.PAGE_FOR_POSTS));

	let breadCrumbs;

	if (props.isPageOnFront && props.isPageForPosts) {
		return <></>;
	} else if (!props.isPageOnFront && props.isPageForPosts) {
		breadCrumbs = (
			<>
				{renderLevel(pageOnFront.title, pageOnFront.path, false)}
				{renderLevel(props.current)}
			</>
		);
	} else {
		breadCrumbs = (
			<>
				{renderLevel(pageOnFront.title, pageOnFront.path, false)}
				{pageForPosts && renderLevel(pageForPosts.title, pageForPosts.path)}
				{renderLevel(props.current)}
			</>
		);
	}

	return (
		<div id="bread-crumbs-container" className="container my-3">
			{breadCrumbs}
		</div>
	);
}

BreadCrumbsContainer.propTypes = {
	current: PropTypes.string.isRequired,
	isPageOnFront: PropTypes.bool.isRequired,
	isPageForPosts: PropTypes.bool.isRequired
};

export default BreadCrumbsContainer;
