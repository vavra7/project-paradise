import React from 'react';
import { graphql } from 'gatsby';
import CommonPostLayout from '../components/layouts/CommonPostLayout';
import FixedRightBar from '../components/layouts/bars/FixedRightBar';

export const query = graphql`
	query($id: String!) {
		wpPost(id: { eq: $id }) {
			title
		}
	}
`;

function WpPost({ data }) {
	return (
		<>
			<CommonPostLayout>
				<pre>{JSON.stringify(data, null, 2)}</pre>
			</CommonPostLayout>

			<FixedRightBar>
				<div>alsfjslkj</div>
			</FixedRightBar>
		</>
	);
}

export default WpPost;
