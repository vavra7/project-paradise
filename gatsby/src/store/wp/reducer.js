import { WP } from './types';

const initialState = {
	postsByTag: {},
	searchResult: {
		data: [],
		pagination: {}
	}
};

const getTagPosts = (state, action) => {
	const getPagination = (path, numOfPages) => {
		let pagination = state.postsByTag && state.postsByTag[tagSlug] && state.postsByTag[tagSlug].pagination;
		if (!pagination) {
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

			pagination = _pagination;
		}

		return pagination;
	};

	const tagSlug = action.payload.tagSlug;
	const page = action.payload.page;
	const posts = action.payload.response.data;
	const path = action.payload.path;
	const numOfPages = parseInt(action.payload.response.headers['x-wp-totalpages']);
	const pagination = getPagination(path, numOfPages);

	return {
		...state,
		postsByTag: {
			...state.postsByTag,
			[tagSlug]: {
				...state.postsByTag[tagSlug],
				[page]: posts,
				pagination
			}
		}
	};
};

const getSearchResult = (state, action) => {
	const getPagination = (href, numOfPages) => {
		const url = new URL(href);
		let _pagination = {};
		let _path;

		for (let i = 1; i <= numOfPages; i++) {
			url.searchParams.set('page', i);
			_path = `${url.pathname}${url.search}`;

			_pagination[i] = _path;
		}

		return _pagination;
	};

	const posts = action.payload.response.data;
	const numOfPages = parseInt(action.payload.response.headers['x-wp-totalpages']);
	const href = action.payload.href;
	const pagination = getPagination(href, numOfPages);

	return {
		...state,
		searchResult: {
			data: posts,
			pagination
		}
	};
};

const tagsReducer = (state = initialState, action) => {
	switch (action.type) {
		case WP.GET_TAG_POSTS:
			return getTagPosts(state, action);

		case WP.GET_SEARCH_RESULT:
			return getSearchResult(state, action);

		default:
			return state;
	}
};

export default tagsReducer;
