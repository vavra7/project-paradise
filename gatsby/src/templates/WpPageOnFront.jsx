import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { getWpPageOnFrontMeta } from '../services/pagesMeta';

import FixedRightBar from '../components/fixedBars/FixedRightBar';
import CommonLayout from '../components/layouts/CommonLayout';
import PageMeta from '../components/commons/meta/PageMeta';

export const query = graphql`
	query($wpPageId: Int!) {
		wpPage(wpId: { eq: $wpPageId }) {
			title
			...wpPageOnFrontMeta
		}
	}
`;

function WpPageOnFront(props) {
	const { data } = props;
	const title = data.wpPage.title;
	const meta = getWpPageOnFrontMeta(data.wpPage);

	return (
		<>
			<PageMeta meta={meta} />

			<CommonLayout title={title}>
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
