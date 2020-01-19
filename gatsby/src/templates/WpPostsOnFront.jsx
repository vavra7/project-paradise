import React from 'react';
import { graphql } from 'gatsby';
import CommonLayout from '../components/layouts/CommonLayout';
import FixedRightBar from '../components/fixedBars/FixedRightBar';
import PostPreview from '../components/post/PostPreview';
import CommonPagination from '../components/commons/pagination/CommonPagination';
import PropTypes from 'prop-types';

export const query = graphql`
	query($skip: Int!, $limit: Int!) {
		wpSettings {
			siteTitle
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

function WpPostsOnFront(props) {
	const title = props.data.wpSettings.siteTitle;
	const pagination = props.pageContext.pagination;
	const currentPage = props.pageContext.currentPage;
	const posts = props.data.pagePosts.edges.map(node => node.node);

	return (
		<>
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
