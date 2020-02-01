export default {
	fetchTagPosts: ({ postsPerPage, page, tagId }) => ({
		url: `${process.env.WP_URL}/wp-json/wp/v2/posts`,
		method: 'GET',
		params: {
			per_page: postsPerPage,
			page,
			tags: tagId,
			_fields: 'id'
		}
	}),
	search: ({ postsPerPage, page, searchVal }) => ({
		url: `${process.env.WP_URL}/wp-json/wp/v2/search`,
		method: 'GET',
		params: {
			per_page: postsPerPage,
			page,
			search: searchVal,
			_embed: 1,
			_fields: 'id'
		}
	})
};
