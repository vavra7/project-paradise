import React from 'react';
import { graphql } from 'gatsby';
import FixedRightBar from '../components/fixedBars/FixedRightBar';
import CommonLayout from '../components/layouts/CommonLayout';

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
					title
					path
					excerpt
				}
			}
		}
	}
`;

function PageForPosts(props) {
	const title = props.data.pageForPosts ? props.data.pageForPosts.title : props.data.wpSettings.siteTitle;
	const pagination = props.pageContext.pagination;
	const posts = props.data.pagePosts.edges.map(node => node.node);

	return (
		<>
			<CommonLayout title={title} isPageOnFront={props.data.pageForPosts ? false : true} isPageForPosts>
				<div>
					<h1>Page For Posts Template</h1>
					<div></div>
					<pre>{JSON.stringify(pagination, null, 2)}</pre>
					<pre>{JSON.stringify(posts, null, 2)}</pre>
				</div>
			</CommonLayout>

			<FixedRightBar>
				<div>test</div>
			</FixedRightBar>
		</>
	);
}

export default PageForPosts;
