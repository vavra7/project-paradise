import React from 'react';
import { graphql } from 'gatsby';
import CommonLayout from '../components/layouts/CommonLayout';
import BreadCrumbsContainer from '../components/header/BreadCrumbsContainer';
import PropTypes from 'prop-types';

export const query = graphql`
	query($wpPageId: Int!) {
		wpPage(wpId: { eq: $wpPageId }) {
			title
		}
	}
`;

function WpPage({ data }) {
	const title = data.wpPage.title;

	return (
		<CommonLayout
			title={title} //
			breadCrumbs={<BreadCrumbsContainer current={title} />}
		>
			<div>
				<pre>{JSON.stringify(data, null, 2)}</pre>
			</div>
		</CommonLayout>
	);
}

WpPage.propTypes = {
	data: PropTypes.object.isRequired
};

export default WpPage;
