import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

function CommonPagination(props) {
	const { pagination, currentPage } = props;
	const pages = [];

	for (const pageNum in pagination) {
		if (Object.prototype.hasOwnProperty.call(pagination, pageNum)) {
			pages.push(
				<li key={pageNum}>
					{/* eslint-disable eqeqeq*/}
					<Link className={pageNum == currentPage ? 'is-active' : ''} to={pagination[pageNum]}>
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
