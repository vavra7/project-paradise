import { TAGS } from './types';
import api from '../../api';

const fetchTagPosts = ({requestId, params}) => ({
	apiRequest: true,
	type: TAGS.FETCH_TAG_POSTS,
	payload: {
		...api.wp.fetchTagPosts(params),
		requestId,
		tagSlug: params.tagSlug,
		page: params.page,
		onSuccess: setTagPosts
	}
});

const setTagPosts = ({ data, payload }) => ({
	type: TAGS.SET_TAG_POSTS,
	payload: {
		page: payload.page,
		tagSlug: payload.tagSlug,
		posts: data.data
	}
});

export { fetchTagPosts };
