import React from 'react';
import { graphql } from 'gatsby';
import CommonLayout from '../components/layouts/CommonLayout';
import FixedRightBar from '../components/fixedBars/FixedRightBar';
import Post from '../components/post/Post';
import BlocksRouter from '../components/blocks/BlocksRouter';
import PropTypes from 'prop-types';

export const query = graphql`
	query($wpPostId: Int!) {
		wpPost(wpId: { eq: $wpPostId }) {
			title
			...post
			...blocksRouter
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
