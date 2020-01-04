import React from 'react';
import { graphql } from 'gatsby';

export const query = graphql`
	query($wpId: Int!) {
		wpPage(wpId: { eq: $wpId }) {
			title
		}
	}
`;

function PageForPosts({ data }) {
	return (
		<div>
			<h1>Page For Posts Template</h1>
			<pre>{JSON.stringify(data, null, 2)}</pre>
		</div>
	);
}

export default PageForPosts;
