import React from 'react';
import { graphql } from 'gatsby';
import CommonLayout from '../components/layouts/CommonLayout';
import FixedRightBar from '../components/fixedBars/FixedRightBar';
import PostPreview from '../components/post/PostPreview';
import CommonPagination from '../components/commons/pagination/CommonPagination';
import BreadCrumbsContainer from '../components/header/BreadCrumbsContainer';
import PropTypes from 'prop-types';

export const query = graphql`
	query($wpCategoryId: Int!, $limit: Int!, $skip: Int!) {
		wpCategory(wpId: { eq: $wpCategoryId }) {
			name
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
	const title = props.data.wpCategory.name;
	const pagination = props.pageContext.pagination;
	const currentPage = props.pageContext.currentPage;
	const posts = props.data.pagePosts.edges.map(node => node.node);
	const level2 = { title: 'Kategorie' };

	return (
		<>
			<CommonLayout
				title={title} //
				breadCrumbs={<BreadCrumbsContainer current={title} level2={level2} />}
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
