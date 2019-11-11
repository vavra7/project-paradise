import React from 'react';
import { graphql } from 'gatsby';

export const query = graphql`
	query($id: String!) {
		wpPost(id: { eq: $id }) {
			title
		}
	}
`;

export const WpPost = ({ data }) => {
	return (
		<div>
			<pre>{JSON.stringify(data, null, 2)}</pre>
		</div>
	);
};

export default WpPost;
