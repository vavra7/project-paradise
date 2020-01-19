module.exports.FIELDS = {
	WP_POSTS: [
		'id',
		'date_gmt',
		'modified_gmt',
		'path',
		'title',
		'featured_media',
		'content',
		'excerpt',
		'blocks',
		'categories'
	],
	WP_PAGES: ['id', 'date_gmt', 'modified_gmt', 'path', 'title', 'featured_media', 'content', 'excerpt', 'states'],
	WP_MEDIA: ['id', 'date_gmt', 'modified_gmt', 'post', 'source_url', 'alt_text'],
	WP_CATEGORIES: ['id', 'path', 'name', 'count']
};
