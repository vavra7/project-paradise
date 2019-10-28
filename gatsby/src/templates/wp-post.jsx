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
	return <pre>{JSON.stringify(props, null, 2)}</pre>;
};

export default WpPost;
