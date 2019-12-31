const { request, requestPagedWpData } = require('./utils');
const { FIELDS } = require('./fields');

module.exports = {
	pages: {
		id: 'WP_PAGES',
		handler: requestPagedWpData,
		config: {
			method: 'get',
			url: `${process.env.WP_URL}/wp-json/wp/v2/pages`,
			headers: {}
		},
		reduce: res => res
	},
	posts: {
		id: 'WP_POSTS',
		handler: requestPagedWpData,
		config: {
			method: 'get',
			url: `${process.env.WP_URL}/wp-json/wp/v2/posts?_fields=${FIELDS.WP_POSTS.join(',')}`,
			headers: {}
		},
		reduce: res => res
	},
	menus: {
		id: 'WP_MENUS',
		handler: request,
		config: {
			method: 'get',
			url: `${process.env.WP_URL}/wp-json/wp/v2/menus`,
			headers: {}
		},
		reduce: res => res.data
	},
	media: {
		id: 'WP_MEDIA',
		handler: requestPagedWpData,
		config: {
			method: 'get',
			url: `${process.env.WP_URL}/wp-json/wp/v2/media?_fields=${FIELDS.WP_MEDIA.join(',')}`,
			headers: {}
		},
		reduce: res => res
	}
};
