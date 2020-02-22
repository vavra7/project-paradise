import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { getWpPageMeta } from '../services/pagesMeta';

import CommonLayout from '../components/layouts/CommonLayout';
import BreadCrumbsContainer from '../components/header/BreadCrumbsContainer';
import PageMeta from '../components/commons/meta/PageMeta';

export const query = graphql`
	query($wpPageId: Int!) {
		wpPage(wpId: { eq: $wpPageId }) {
			title
			...wpPageMeta
		}
	}
`;

function WpPage(props) {
	const { data } = props;
	const title = data.wpPage.title;
	const meta = getWpPageMeta(data.wpPage);

	return (
		<>
			<PageMeta meta={meta} />

			<CommonLayout
				breadCrumbsSlot={<BreadCrumbsContainer current={title} />} //
				title={title}
			>
				<div>
					<pre>{JSON.stringify(data, null, 2)}</pre>
				</div>
			</CommonLayout>
		</>
	);
}

WpPage.propTypes = {
	data: PropTypes.object.isRequired
};

export default WpPage;
