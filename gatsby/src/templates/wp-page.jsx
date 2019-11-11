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
	// const wpPage = props.pageResources.json.data;

	return <pre>{JSON.stringify(props.pageResources.json.data, null, 2)}</pre>;
};

export default WpPage;
