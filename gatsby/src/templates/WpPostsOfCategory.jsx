import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { getWpPostsOfCategoryMeta } from '../services/pagesMeta';

import CommonLayout from '../components/layouts/CommonLayout';
import FixedRightBar from '../components/fixedBars/FixedRightBar';
import PostPreview from '../components/post/PostPreview';
import CommonPagination from '../components/commons/pagination/CommonPagination';
import BreadCrumbsContainer from '../components/header/BreadCrumbsContainer';
import PageMeta from '../components/commons/meta/PageMeta';

export const query = graphql`
	query($wpCategoryId: Int!, $limit: Int!, $skip: Int!) {
		wpCategory(wpId: { eq: $wpCategoryId }) {
			name
			...wpPostsOfCategoryMeta
		}
		pagePosts: allWpPost(
			filter: { categories: { elemMatch: { id: { eq: $wpCategoryId } } } }
			sort: { fields: date, order: DESC }
			limit: $limit
			skip: $skip
		) {
			edges {
				node {
					wpId
					...postPreview
				}
			}
		}
	}
`;

function WpPostsOfCategory(props) {
	const { data, pageContext } = props;
	const title = data.wpCategory.name;
	const pagination = pageContext.pagination;
	const currentPage = pageContext.currentPage;
	const posts = data.pagePosts.edges.map(node => node.node);
	const level2 = { title: 'Kategorie' };
	const meta = getWpPostsOfCategoryMeta(data.wpCategory);

	return (
		<>
			<PageMeta meta={meta} />

			<CommonLayout
				title={title} //
				breadCrumbsSlot={<BreadCrumbsContainer current={title} level2={level2} />}
			>
				<CommonPagination pagination={pagination} currentPage={currentPage} />

				{posts.map(post => (
					<PostPreview key={post.wpId} post={post} />
				))}

				<CommonPagination pagination={pagination} currentPage={currentPage} />
			</CommonLayout>

			<FixedRightBar>
				<div>test</div>
			</FixedRightBar>
		</>
	);
}

WpPostsOfCategory.propTypes = {
	data: PropTypes.object.isRequired,
	pageContext: PropTypes.object.isRequired
};

export default WpPostsOfCategory;
