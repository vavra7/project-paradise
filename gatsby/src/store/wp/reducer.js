import { TAGS } from './types';

const initialState = {
	postsByTag: {}
};

const getPagination = (path, numOfPages) => {
	const cleanPath = path.replace(/\/page\/[\d]+\/?$/i, '');

	let _pagination = {};
	let _path;

	for (let i = 1; i <= numOfPages; i++) {
		if (i === 1) {
			_path = cleanPath;
		} else {
			_path = `${cleanPath}/page/${i}`;
		}

		_pagination[i] = _path;
	}

	return _pagination;
};

const setTagPosts = (state, action) => {
	const tagSlug = action.payload.tagSlug;
	const page = action.payload.page;
	const posts = action.payload.posts;

	return {
		...state,
		postsByTag: {
			...state.postsByTag,
			[tagSlug]: {
				...state.postsByTag[tagSlug],
				[page]: posts
			}
		}
	};
};

const setTagPostsPagination = (state, action) => {
	const tagSlug = action.payload.tagSlug;

	if (state.postsByTag && state.postsByTag[tagSlug] && state.postsByTag[tagSlug].pagination) {
		return state;
	} else {
		const path = action.payload.path;
		const totalPages = action.payload.totalPages;

		return {
			...state,
			postsByTag: {
				...state.postsByTag,
				[tagSlug]: {
					...state.postsByTag[tagSlug],
					pagination: getPagination(path, totalPages)
				}
			}
		};
	}
};

const tagsReducer = (state = initialState, action) => {
	switch (action.type) {
		case TAGS.SET_TAG_POSTS:
			return setTagPosts(state, action);

		case TAGS.SET_TAG_POSTS_PAGINATION:
			return setTagPostsPagination(state, action);

		default:
			return state;
	}
};

export default tagsReducer;
