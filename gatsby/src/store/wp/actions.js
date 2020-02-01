import { WP } from './types';
import api from '../../api';

const fetchTagPosts = ({ requestId, params }) => ({
	apiRequest: true,
	type: WP.FETCH_TAG_POSTS,
	payload: {
		...api.wp.fetchTagPosts(params),
		requestId,
		path: params.path,
		tagSlug: params.tagSlug,
		page: params.page,
		onSuccess: [setTagPosts, setTagPostsPagination]
	}
});

const getSearchResult = ({ postsPerPage, page, searchVal }) => ({
	apiRequest: true,
	type: WP.GET_SEARCH_RESULT,
	payload: {
		...api.wp.search({ postsPerPage, page, searchVal })
	}
});

const setTagPosts = ({ data, action }) => ({
	type: WP.SET_TAG_POSTS,
	payload: {
		page: action.payload.page,
		tagSlug: action.payload.tagSlug,
		posts: data.data
	}
});

const setTagPostsPagination = ({ data, action }) => ({
	type: WP.SET_TAG_POSTS_PAGINATION,
	payload: {
		tagSlug: action.payload.tagSlug,
		path: action.payload.path,
		totalPages: parseInt(data.headers['x-wp-totalpages'])
	}
});

export { fetchTagPosts, getSearchResult };
