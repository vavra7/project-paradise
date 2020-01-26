export default {
	fetchTagPosts: ({ postsPerPage, page, tagId }) => ({
		url: `${process.env.WP_URL}/wp-json/wp/v2/posts/?per_page=${postsPerPage}&page=${page}&tags=${tagId}&_fields=id,slug`,
		reduce: res => res
	})
};
