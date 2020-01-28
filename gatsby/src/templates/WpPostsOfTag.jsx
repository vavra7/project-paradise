import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useStaticQuery, graphql, navigate } from 'gatsby';
import { fetchTagPosts } from '../store/wp/actions';
import { getState } from '../store/api/selectors';
import { getTagPagePosts } from '../store/wp/selectors';

const getRequestId = (tagSlug, page) => {
	return `FETCH_TAG_POSTS__${tagSlug}__${page}`.toUpperCase();
};

function WpPostsOfTag(props) {
	const queriedData = useStaticQuery(
		graphql`
			query {
				wpSettings {
					postsPerPage
				}
				allWpTag {
					edges {
						node {
							wpId
							slug
						}
					}
				}
			}
		`
	);

	const { fetchTagPosts, statePosts, posts, tagSlug } = props;
	const tagId = queriedData.allWpTag.edges.find(node => node.node.slug === tagSlug)
		? queriedData.allWpTag.edges.find(node => node.node.slug === tagSlug).node.wpId
		: 0;

	if (!tagId) navigate('/404');

	const page = props.page ? props.page : 1;
	const requestId = getRequestId(tagSlug, page);
	const postsPerPage = queriedData.wpSettings.postsPerPage;

	useEffect(() => {
		if (!posts.length) {
			fetchTagPosts({
				requestId,
				params: {
					postsPerPage,
					page,
					tagId,
					tagSlug
				}
			});
		}
	}, []);

	return (
		<div>
			<pre>{JSON.stringify(statePosts.pending, null, 2)}</pre>
			<pre>{JSON.stringify(posts, null, 2)}</pre>
		</div>
	);
}

WpPostsOfTag.propTypes = {
	tagSlug: PropTypes.string.isRequired,
	posts: PropTypes.array.isRequired,
	statePosts: PropTypes.object.isRequired,
	page: PropTypes.string,
	fetchTagPosts: PropTypes.func.isRequired
};

const mapStateToProps = (state, props) => {
	const { tagSlug } = props;
	const page = props.page ? props.page : 1;
	const requestId = getRequestId(tagSlug, page);

	return {
		posts: getTagPagePosts(state, tagSlug, page),
		statePosts: getState(state, requestId)
	};
};

const mapDispatchToProps = {
	fetchTagPosts
};

export default connect(mapStateToProps, mapDispatchToProps)(WpPostsOfTag);
