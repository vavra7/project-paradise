import React from 'react';
import { graphql } from 'gatsby';
import CommonLayout from '../components/layouts/CommonLayout';
import FixedRightBar from '../components/fixedBars/FixedRightBar';
import PostPreview from '../components/post/PostPreview';
import CommonPagination from '../components/commons/pagination/CommonPagination';
import BreadCrumbsContainer from '../components/header/BreadCrumbsContainer';
import PropTypes from 'prop-types';

export const query = graphql`
	query($wpPageId: Int!, $skip: Int!, $limit: Int!) {
		wpSettings {
			siteTitle
		}
		pageForPosts: wpPage(wpId: { eq: $wpPageId }) {
			title
		}
		pagePosts: allWpPost(sort: { fields: [date], order: DESC }, limit: $limit, skip: $skip) {
			edges {
				node {
					wpId
					...postPreview
				}
			}
		}
	}
`;

function WpPageForPosts(props) {
	const title = props.data.pageForPosts.title;
	const pagination = props.pageContext.pagination;
	const currentPage = props.pageContext.currentPage;
	const posts = props.data.pagePosts.edges.map(node => node.node);

	return (
		<>
			<CommonLayout
				title={title} //
				breadCrumbs={<BreadCrumbsContainer current={title} />}
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

WpPageForPosts.propTypes = {
	data: PropTypes.object.isRequired,
	pageContext: PropTypes.object.isRequired
};

export default WpPageForPosts;
