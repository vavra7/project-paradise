import React from 'react';
import { graphql } from 'gatsby';
import CommonPostLayout from '../components/layouts/CommonPostLayout';
import FixedRightBar from '../components/fixedBars/FixedRightBar';

export const query = graphql`
	query($wpId: Int, $featuredMedia: Int) {
		wpPost(wpId: { eq: $wpId }) {
			title
			wpId
			featuredMedia
		}
		featuredMedia: wpMedia(wpId: { eq: $featuredMedia }) {
			wpId
			url
		}
		postMedia: allWpMedia(filter: { wpPost: { eq: $wpId } }) {
			edges {
				node {
					wpId
					url
				}
			}
		}
	}
`;

function WpPost({ data }) {
	return (
		<>
			<CommonPostLayout title={data.wpPost.title}>
				<pre>{JSON.stringify(data, null, 2)}</pre>
			</CommonPostLayout>

			<FixedRightBar>
				<div>alsfjslkj</div>
			</FixedRightBar>
		</>
	);
}

export default WpPost;
