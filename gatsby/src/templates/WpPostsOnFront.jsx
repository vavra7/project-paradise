import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';

import CommonLayout from '../components/layouts/CommonLayout';
import FixedRightBar from '../components/fixedBars/FixedRightBar';
import PostPreview from '../components/post/PostPreview';
import CommonPagination from '../components/commons/pagination/CommonPagination';
import PageMeta from '../components/commons/meta/PageMeta';

export const query = graphql`
	query($skip: Int!, $limit: Int!) {
		wpSettings {
			siteTitle
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

function WpPostsOnFront(props) {
	const { data, pageContext } = props;
	const title = data.wpSettings.siteTitle;
	const pagination = pageContext.pagination;
	const currentPage = pageContext.currentPage;
	const posts = data.pagePosts.edges.map(node => node.node);
	const meta = {
		title
	};

	return (
		<>
			<PageMeta meta={meta} />

			<CommonLayout title={title} isPostsOnFront>
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

WpPostsOnFront.propTypes = {
	data: PropTypes.object.isRequired,
	pageContext: PropTypes.object.isRequired
};

export default WpPostsOnFront;
