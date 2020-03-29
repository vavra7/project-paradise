const getTagPagePosts = (state, tagSlug, page) => {
	return state.wp.postsByTag[tagSlug] && state.wp.postsByTag[tagSlug][page] ? state.wp.postsByTag[tagSlug][page] : [];
};

const getTagPagination = (state, tagSlug) => {
	return state.wp.postsByTag[tagSlug] && state.wp.postsByTag[tagSlug].pagination
		? state.wp.postsByTag[tagSlug].pagination
		: {};
};

export { getTagPagePosts, getTagPagination };
