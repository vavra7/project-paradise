import { TAGS } from './types';

const initialState = {
	postsByTag: {}
};

const tagsReducer = (state = initialState, action) => {
	switch (action.type) {
		case TAGS.SET_TAG_POSTS:
			return {
				...state,
				postsByTag: {
					...state.postsByTag,
					[action.payload.tagSlug]: {
						...state.postsByTag[action.payload.tagSlug],
						[action.payload.page]: action.payload.posts
					}
				}
			};

		default:
			return state;
	}
};

export default tagsReducer;
