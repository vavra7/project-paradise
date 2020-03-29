import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';
import { SHOW_ON_FRONT } from '../../enums';

function BreadCrumbsContainer(props) {
	const data = useStaticQuery(
		graphql`
			query {
				wpSettings {
					showOnFront
				}
				pageOnFront: wpPage(states: { eq: "page_on_front" }) {
					title
					path
				}
			}
		`
	);

	const getLevel1 = () => {
		const showOnFront = data.wpSettings.showOnFront;
		const pageOnFront = data.pageOnFront;

		if (showOnFront === SHOW_ON_FRONT.PAGE && pageOnFront) {
			return { path: pageOnFront.path, title: pageOnFront.title };
		} else {
			return { path: '/', title: 'Domů' };
		}
	};

	const renderLevel = (title, to = null, useGoBetween = true) => {
		const goBetween = <> &gt; </>;

		return (
			<>
				{useGoBetween && goBetween}
				{to ? <Link to={to}>{title}</Link> : title}
			</>
		);
	};

	const level1 = getLevel1();
	const { level2 } = props;

	return (
		<div id="bread-crumbs-container" className="container my-3">
			{renderLevel(level1.title, level1.path, false)}
			{level2 && renderLevel(level2.title, level2.path)}
			{renderLevel(props.current)}
		</div>
	);
}

BreadCrumbsContainer.propTypes = {
	level2: PropTypes.object,
	current: PropTypes.string.isRequired
};

export default BreadCrumbsContainer;
