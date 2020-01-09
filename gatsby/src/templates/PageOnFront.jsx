import React from 'react';
import { graphql } from 'gatsby';
import FixedRightBar from '../components/fixedBars/FixedRightBar';
import CommonLayout from '../components/layouts/CommonLayout';

export const query = graphql`
	query($wpId: Int!) {
		wpPage(wpId: { eq: $wpId }) {
			title
		}
	}
`;

function PageOnFront({ data }) {
	return (
		<>
			<CommonLayout title="todo">
				<div>
					<h1>Page On Front Template</h1>
					<pre>{JSON.stringify(data, null, 2)}</pre>
				</div>
			</CommonLayout>

			<FixedRightBar>
				<div>alsfjslkj</div>
			</FixedRightBar>
		</>
	);
}

export default PageOnFront;
