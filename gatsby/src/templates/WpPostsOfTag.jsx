import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useStaticQuery, graphql } from 'gatsby';
import { fetchTagPosts } from '../store/wp/actions';

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

	const getRequestId = (tagSlug, page) => {
		return `FETCH_TAG_POSTS__${tagSlug}__${page}`.toUpperCase();
	};

	const { fetchTagPosts, tagSlug } = props;
	const page = props.page ? props.page : 1;
	const requestId = getRequestId(tagSlug, page);

	useEffect(() => {
		fetchTagPosts({
			requestId,
			params: {
				postsPerPage: queriedData.wpSettings.postsPerPage,
				page: page,
				tagId: queriedData.allWpTag.edges.find(node => node.node.slug === tagSlug).node.wpId,
				tagSlug: tagSlug
			}
		});
	}, [fetchTagPosts, tagSlug, queriedData, page, requestId]);

	return (
		<div>
			<pre>queriedData: {JSON.stringify(queriedData, null, 2)}</pre>
			<pre>slug: {props.tagSlug}</pre>
			<pre>props: {JSON.stringify(props, null, 2)}</pre>
		</div>
	);
}

WpPostsOfTag.propTypes = {
	tagSlug: PropTypes.string.isRequired,
	page: PropTypes.string,
	fetchTagPosts: PropTypes.func
};

const mapStateToProps = state => ({
	postsByTag: state.wp.postsByTag
});

const mapDispatchToProps = {
	fetchTagPosts
};

export default connect(mapStateToProps, mapDispatchToProps)(WpPostsOfTag);
