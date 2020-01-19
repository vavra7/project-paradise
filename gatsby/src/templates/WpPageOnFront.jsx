import React from 'react';
import { graphql } from 'gatsby';
import FixedRightBar from '../components/fixedBars/FixedRightBar';
import CommonLayout from '../components/layouts/CommonLayout';
import PropTypes from 'prop-types';

export const query = graphql`
	query($wpPage: Int!) {
		wpPage(wpId: { eq: $wpPage }) {
			title
		}
	}
`;

function WpPageOnFront({ data }) {
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

WpPageOnFront.propTypes = {
	data: PropTypes.object.isRequired
};

export default WpPageOnFront;
