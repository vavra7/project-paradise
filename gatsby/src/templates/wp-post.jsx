import React from 'react';
import { graphql } from 'gatsby';
import CommonPostLayout from '../components/layouts/CommonPostLayout';

export const query = graphql`
	query($id: String!) {
		wpPost(id: { eq: $id }) {
			title
		}
	}
`;

export const WpPost = ({ data }) => {
	return (
		<CommonPostLayout>
			<pre>{JSON.stringify(data, null, 2)}</pre>
		</CommonPostLayout>
	);
};

export default WpPost;
