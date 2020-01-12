import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

function CommonPagination(props) {
	const pages = [];

	for (const pageNum in props.pagination) {
		if (props.pagination.hasOwnProperty) {
			pages.push(
				<li key={pageNum}>
					{/* eslint-disable eqeqeq*/}
					<Link className={pageNum == props.currentPage ? 'is-active' : ''} to={props.pagination[pageNum]}>
						{pageNum}
					</Link>
					{/* eslint-enable eqeqeq*/}
				</li>
			);
		}
	}

	return <ul>{pages}</ul>;
}

CommonPagination.propTypes = {
	pagination: PropTypes.object.isRequired,
	currentPage: PropTypes.number.isRequired
};

export default CommonPagination;
