import React from 'react';
import { graphql } from 'gatsby';

export const query = graphql`
	query($id: String!) {
		wpPage(id: { eq: $id }) {
			title
		}
	}
`;

export const WpPage = props => {
	const wpPost = props.pageResources.json.data;

	return <pre>{JSON.stringify(wpPost, null, 2)}</pre>;
};

export default WpPage;
