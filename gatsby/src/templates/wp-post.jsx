import React from 'react';
import { graphql } from 'gatsby';

export const query = graphql`
	query($id: String!) {
		wpPost(id: { eq: $id }) {
			title
		}
	}
`;

export const WpPost = props => {
	const wpPost = props.pageResources.json.data;

	return (
		<div>
			<pre>{JSON.stringify(wpPost, null, 2)}</pre>
		</div>
	);
};

export default WpPost;
