import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';

import CommonLayout from '../components/layouts/CommonLayout';
import FixedRightBar from '../components/fixedBars/FixedRightBar';
import PostPreview from '../components/post/PostPreview';
import CommonPagination from '../components/commons/pagination/CommonPagination';
import BreadCrumbsContainer from '../components/header/BreadCrumbsContainer';
import PageMeta from '../components/commons/meta/PageMeta';

export const query = graphql`
	query($wpPageId: Int!, $skip: Int!, $limit: Int!) {
		wpSettings {
			siteTitle
		}
		pageForPosts: wpPage(wpId: { eq: $wpPageId }) {
			title
			link
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
	const { data, pageContext } = props;
	const title = data.pageForPosts.title;
	const link = data.pageForPosts.link;
	const pagination = pageContext.pagination;
	const currentPage = pageContext.currentPage;
	const posts = data.pagePosts.edges.map(node => node.node);
	const meta = {
		title,
		url: link
	};

	return (
		<>
			<PageMeta meta={meta} />

			<CommonLayout
				breadCrumbs={<BreadCrumbsContainer current={title} />} //
				title={title}
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
