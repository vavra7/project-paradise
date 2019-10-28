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
	return <pre>{JSON.stringify(props, null, 2)}</pre>;
};

export default WpPage;
