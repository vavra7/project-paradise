import React from 'react';
import { graphql } from 'gatsby';

export const query = graphql`
	query($wpId: Int!, $skip: Int!, $limit: Int!) {
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
	const pagination = props.pageContext.pagination;
	const posts = props.data.pagePosts.edges.map(node => node.node);

	return (
		<div>
			<h1>Page For Posts Template</h1>
			<div></div>
			<pre>{JSON.stringify(pagination, null, 2)}</pre>
			<pre>{JSON.stringify(posts, null, 2)}</pre>
		</div>
	);
}

export default PageForPosts;
