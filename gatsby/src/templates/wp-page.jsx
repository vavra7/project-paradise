import React from 'react';
import { graphql } from 'gatsby';

export const query = graphql`
	query($id: String!) {
		wpPage(id: { eq: $id }) {
			title
		}
	}
`;

export const WpPage = ({ data }) => {
	return (
		<div>
			<pre>{JSON.stringify(data, null, 2)}</pre>
		</div>
	);
};

export default WpPage;
