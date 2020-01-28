import { TAGS } from './types';
import api from '../../api';

const fetchTagPosts = ({ requestId, params }) => ({
	apiRequest: true,
	type: TAGS.FETCH_TAG_POSTS,
	payload: {
		...api.wp.fetchTagPosts(params),
		requestId,
		path: params.path,
		tagSlug: params.tagSlug,
		page: params.page,
		onSuccess: [setTagPosts, setTagPostsPagination]
	}
});

const setTagPosts = ({ data, action }) => ({
	type: TAGS.SET_TAG_POSTS,
	payload: {
		page: action.payload.page,
		tagSlug: action.payload.tagSlug,
		posts: data.data
	}
});

const setTagPostsPagination = ({ data, action }) => ({
	type: TAGS.SET_TAG_POSTS_PAGINATION,
	payload: {
		tagSlug: action.payload.tagSlug,
		path: action.payload.path,
		totalPages: parseInt(data.headers['x-wp-totalpages'])
	}
});

export { fetchTagPosts };
