import React from 'react';
import { graphql } from 'gatsby';
import CommonLayout from '../components/layouts/CommonLayout';
import FixedRightBar from '../components/fixedBars/FixedRightBar';
import Post from '../components/post/Post';
import BlocksRouter from '../components/blocks/BlocksRouter';
import PropTypes from 'prop-types';

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
			<CommonLayout title={title}>
				<Post featuredMedia={featuredMedia}>
					<BlocksRouter blocks={blocks} media={media} />
				</Post>
			</CommonLayout>

			<FixedRightBar>
				<div>test</div>
			</FixedRightBar>
		</>
	);
}

WpPost.propTypes = {
	data: PropTypes.object.isRequired
};

export default WpPost;
