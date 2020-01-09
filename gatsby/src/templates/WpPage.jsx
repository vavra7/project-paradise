import React from 'react';
import { graphql } from 'gatsby';
import CommonLayout from '../components/layouts/CommonLayout';

export const query = graphql`
	query($wpId: Int!) {
		wpPage(wpId: { eq: $wpId }) {
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

export default WpPage;
