import React from 'react';
import { graphql } from 'gatsby';
import CommonPostLayout from '../components/layouts/CommonPostLayout';
import FixedRightBar from '../components/fixedBars/FixedRightBar';
import BlocksRouter from '../components/blocks/BlocksRouter';

export const query = graphql`
	query($wpId: Int!) {
		wpPost(wpId: { eq: $wpId }) {
			title
			blocks
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
			media {
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
`;

function WpPost({ data }) {
	const title = data.wpPost.title;
	const featuredMedia = data.wpPost.featuredMedia;
	const media = data.wpPost.media;
	const blocks = JSON.parse(data.wpPost.blocks);

	return (
		<>
			<CommonPostLayout title={title} featuredMedia={featuredMedia}>
				<BlocksRouter blocks={blocks} media={media} />
			</CommonPostLayout>

			<FixedRightBar>
				<div>alsfjslkj</div>
			</FixedRightBar>
		</>
	);
}

export default WpPost;
