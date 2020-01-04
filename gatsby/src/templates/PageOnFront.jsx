import React from 'react';
import { graphql } from 'gatsby';

export const query = graphql`
	query($wpId: Int!) {
		wpPage(wpId: { eq: $wpId }) {
			title
		}
	}
`;

function PageOnFront({ data }) {
	return (
		<div>
			<h1>Page On Front Template</h1>
			<pre>{JSON.stringify(data, null, 2)}</pre>
		</div>
	);
}

export default PageOnFront;
