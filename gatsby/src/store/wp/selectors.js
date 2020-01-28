const getTagPagePosts = (state, tagSlug, page) => {
	return state.wp.postsByTag[tagSlug] && state.wp.postsByTag[tagSlug][page] ? state.wp.postsByTag[tagSlug][page] : [];
};

export { getTagPagePosts };
