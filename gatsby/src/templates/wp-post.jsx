import React from 'react';
import { graphql } from 'gatsby';
import CommonPostLayout from '../components/layouts/CommonPostLayout';
import FixedRightBar from '../components/fixedBars/FixedRightBar';

export const query = graphql`
	query($wpId: Int!) {
		wpPost(wpId: { eq: $wpId }) {
			wpId
			title
			blocks
			featuredMedia {
				id
				childWpMedia {
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
			content
		}
	}
`;

function WpPost({ data }) {
	const title = data.wpPost.title;
	const featuredImgSrc = data.wpPost.featuredMedia.id
		? data.wpPost.featuredMedia.childWpMedia.childFile.childImageSharp.fluid
		: null;
	const content = data.wpPost.content;
	// const blocks = JSON.parse(data.wpPost.blocks);

	return (
		<>
			<CommonPostLayout title={title} featuredImgSrc={featuredImgSrc} content={content}>
				<div className="entry-content" dangerouslySetInnerHTML={{ __html: content }}></div>
			</CommonPostLayout>

			<FixedRightBar>
				<div>alsfjslkj</div>
			</FixedRightBar>
		</>
	);
}

export default WpPost;
