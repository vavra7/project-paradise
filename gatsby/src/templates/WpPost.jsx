import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { SHOW_ON_FRONT } from '../enums';

import CommonLayout from '../components/layouts/CommonLayout';
import FixedRightBar from '../components/fixedBars/FixedRightBar';
import Post from '../components/post/Post';
import BlocksRouter from '../components/blocks/BlocksRouter';
import BreadCrumbsContainer from '../components/header/BreadCrumbsContainer';
import PageMeta from '../components/commons/meta/PageMeta';

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
			link
			...post
			...blocksRouter
		}
	}
`;

function WpPost(props) {
	const { data } = props;

	const getLevel2 = () => {
		const showOnFront = data.wpSettings.showOnFront;
		const pageForPosts = data.pageForPosts;

		if (showOnFront === SHOW_ON_FRONT.PAGE && pageForPosts) {
			return { path: pageForPosts.path, title: pageForPosts.title };
		} else {
			return null;
		}
	};

	const title = data.wpPost.title;
	const link = data.wpPost.link;
	const featuredMedia = data.wpPost.featuredMedia;
	const media = data.wpPost.media;
	const blocks = JSON.parse(data.wpPost.blocks);
	const level2 = getLevel2();
	const meta = {
		title,
		url: link,
		type: 'article'
	};

	return (
		<>
			<PageMeta meta={meta} />

			<CommonLayout
				breadCrumbs={<BreadCrumbsContainer current={title} level2={level2} />} //
				title={title}
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
