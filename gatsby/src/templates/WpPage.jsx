import React from 'react';
import { graphql } from 'gatsby';

export const query = graphql`
	query($wpId: Int!) {
		wpPage(wpId: { eq: $wpId }) {
			title
		}
	}
`;

function WpPage({ data }) {
	return (
		<div>
			<pre>{JSON.stringify(data, null, 2)}</pre>
		</div>
	);
}

export default WpPage;
