import { ACTIONS } from './types';

export const setPostsPerPage = postsNum => ({
	type: ACTIONS.SETTINGS.SET_POSTS_PER_PAGE,
	payload: postsNum
});
