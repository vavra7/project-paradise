import React, { useEffect } from 'react';
import { useStaticQuery, graphql, navigate } from 'gatsby';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTagPosts } from '../store/wp/actions';
import { getState } from '../store/requests/selectors';
import { getTagPagePosts, getTagPagination } from '../store/wp/selectors';
import CommonLayout from '../components/layouts/CommonLayout';
import CommonPagination from '../components/commons/pagination/CommonPagination';
import FixedRightBar from '../components/fixedBars/FixedRightBar';

const getRequestId = (tagSlug, page) => {
	return `GET_TAG_POSTS__${tagSlug}__${page}`.toUpperCase();
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
							name
							slug
						}
					}
				}
			}
		`
	);

	const { getTagPosts, pagination, location, statePosts, posts, tagSlug } = props;
	const tagObject = queriedData.allWpTag.edges.find(node => node.node.slug === tagSlug);

	if (!tagObject) navigate('/404');

	const tagId = tagObject ? tagObject.node.wpId : 0;
	const title = tagObject ? tagObject.node.name : '';
	const path = location.pathname;
	const page = props.page ? parseInt(props.page) : 1;
	const requestId = getRequestId(tagSlug, page);
	const postsPerPage = queriedData.wpSettings.postsPerPage;

	useEffect(() => {
		if (!posts.length) {
			getTagPosts({
				requestId,
				postsPerPage,
				page,
				tagId,
				tagSlug,
				path
			});
		}
	}, [path]);

	return (
		<>
			<CommonLayout title={title}>
				<CommonPagination pagination={pagination} currentPage={page} />
				<pre>{JSON.stringify(statePosts.pending, null, 2)}</pre>
				<pre>{JSON.stringify(posts, null, 2)}</pre>
				<pre>{JSON.stringify(pagination, null, 2)}</pre>
			</CommonLayout>

			<FixedRightBar>
				<div>test</div>
			</FixedRightBar>
		</>
	);
}

WpPostsOfTag.propTypes = {
	location: PropTypes.object.isRequired,
	tagSlug: PropTypes.string.isRequired,
	posts: PropTypes.array.isRequired,
	statePosts: PropTypes.object.isRequired,
	pagination: PropTypes.object.isRequired,
	page: PropTypes.string,
	getTagPosts: PropTypes.func.isRequired
};

const mapStateToProps = (state, props) => {
	const { tagSlug } = props;
	const page = props.page ? props.page : 1;
	const requestId = getRequestId(tagSlug, page);

	return {
		posts: getTagPagePosts(state, tagSlug, page),
		statePosts: getState(state, requestId),
		pagination: getTagPagination(state, tagSlug)
	};
};

const mapDispatchToProps = {
	getTagPosts
};

export default connect(mapStateToProps, mapDispatchToProps)(WpPostsOfTag);
