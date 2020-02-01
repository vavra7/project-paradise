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

const getSearchResult = ({ postsPerPage, page, searchVal, href }) => ({
	type: WP.GET_SEARCH_RESULT,
	apiRequest: {
		config: api.wp.search,
		params: {
			postsPerPage,
			page,
			searchVal
		}
	},
	payload: {
		href
	}
});

export { getTagPosts, getSearchResult };
