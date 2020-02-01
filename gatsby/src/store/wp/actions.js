import { WP } from './types';
import api from '../../api';

const getTagPosts = ({ requestId, postsPerPage, path, tagSlug, page, tagId }) => ({
	type: WP.GET_TAG_POSTS,
	apiRequest: {
		id: requestId,
		config: api.wp.fetchTagPosts,
		params: {
			postsPerPage,
			page,
			tagId
		}
	},
	payload: {
		path,
		tagSlug,
		page
	}
});

const getSearchResult = ({ postsPerPage, page, searchVal }) => ({
	apiRequest: true,
	type: WP.GET_SEARCH_RESULT,
	payload: {
		...api.wp.search({ postsPerPage, page, searchVal })
	}
});

export { getTagPosts, getSearchResult };
