import React from 'react';
import { graphql } from 'gatsby';
import CommonLayout from '../components/layouts/CommonLayout';
import FixedRightBar from '../components/fixedBars/FixedRightBar';
import Post from '../components/post/Post';
import BlocksRouter from '../components/blocks/BlocksRouter';
import PropTypes from 'prop-types';
import BreadCrumbsContainer from '../components/header/BreadCrumbsContainer';
import { SHOW_ON_FRONT } from '../enums';

export const query = graphql`
	query($wpPostId: Int!) {
		wpSettings {
			showOnFront
		}
		pageForPosts: wpPage(states: { eq: "page_for_posts" }) {
			title
			path
		}
		wpPost(wpId: { eq: $wpPostId }) {
			title
			...post
			...blocksRouter
		}
	}
`;

function WpPost(props) {
	const getLevel2 = () => {
		const showOnFront = props.data.wpSettings.showOnFront;
		const pageForPosts = props.data.pageForPosts;

		if (showOnFront === SHOW_ON_FRONT.PAGE && pageForPosts) {
			return { path: pageForPosts.path, title: pageForPosts.title };
		} else {
			return null;
		}
	};

	const title = props.data.wpPost.title;
	const featuredMedia = props.data.wpPost.featuredMedia;
	const media = props.data.wpPost.media;
	const blocks = JSON.parse(props.data.wpPost.blocks);
	const level2 = getLevel2();

	return (
		<>
			<CommonLayout
				title={title} //
				breadCrumbs={<BreadCrumbsContainer current={title} level2={level2} />}
			>
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
