import React from 'react';
import { graphql } from 'gatsby';
import FixedRightBar from '../components/fixedBars/FixedRightBar';
import CommonLayout from '../components/layouts/CommonLayout';
import PostPreview from '../components/post/PostPreview';
import CommonPagination from '../components/commons/pagination/CommonPagination';
import PropTypes from 'prop-types';

export const query = graphql`
	query($wpId: Int!, $skip: Int!, $limit: Int!) {
		wpSettings {
			siteTitle
		}
		pageForPosts: wpPage(wpId: { eq: $wpId }) {
			title
		}
		pagePosts: allWpPost(sort: { fields: [date], order: DESC }, limit: $limit, skip: $skip) {
			edges {
				node {
					wpId
					title
					path
					excerpt
					featuredMedia {
						id
						childWpMedia {
							altText
							childFile {
								childImageSharp {
									id
									fluid(maxWidth: 1200, srcSetBreakpoints: [200, 340, 520, 890, 960, 1100]) {
										...GatsbyImageSharpFluid_tracedSVG
									}
								}
							}
						}
					}
				}
			}
		}
	}
`;

function PageForPosts(props) {
	const title = props.data.pageForPosts ? props.data.pageForPosts.title : props.data.wpSettings.siteTitle;
	const pagination = props.pageContext.pagination;
	const currentPage = props.pageContext.currentPage;
	const posts = props.data.pagePosts.edges.map(node => node.node);

	return (
		<>
			<CommonLayout title={title} isPageOnFront={props.data.pageForPosts ? false : true} isPageForPosts>
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

PageForPosts.propTypes = {
	data: PropTypes.object.isRequired,
	pageContext: PropTypes.object.isRequired
};

export default PageForPosts;
