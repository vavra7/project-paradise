import React from 'react';
import { graphql } from 'gatsby';
import CommonLayout from '../components/layouts/CommonLayout';
import PropTypes from 'prop-types';

export const query = graphql`
	query($wpPageId: Int!) {
		wpPage(wpId: { eq: $wpPageId }) {
			title
		}
	}
`;

function WpPage({ data }) {
	return (
		<CommonLayout title="todo">
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
