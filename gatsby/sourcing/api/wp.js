const { request, requestPagedWpData } = require('./utils');
const { FIELDS } = require('./fields');

module.exports = {
	generateToken: () => ({
		id: 'WP_GENERATE_TOKEN',
		handler: request,
		config: {
			method: 'POST',
			url: `${process.env.WP_URL}/wp-json/project-paradise/v1/generate-token`,
			headers: {
				'Content-Type': 'application/json'
			},
			data: {
				username: process.env.WP_USERNAME,
				password: process.env.WP_PASSWORD
			}
		},
		reduce: res => res.data.token
	}),
	settings: ({ token }) => ({
		id: 'WP_SETTINGS',
		handler: request,
		config: {
			method: 'GET',
			url: `${process.env.WP_URL}/wp-json/wp/v2/settings?_fields=${FIELDS.WP_SETTINGS.join(',')}`,
			headers: {
				authorization: `Bearer ${token}`
			}
		},
		reduce: res => res.data
	}),
	pages: () => ({
		id: 'WP_PAGES',
		handler: requestPagedWpData,
		config: {
			method: 'GET',
			url: `${process.env.WP_URL}/wp-json/wp/v2/pages?_fields=${FIELDS.WP_PAGES.join(',')}`
		},
		reduce: res => res
	}),
	posts: () => ({
		id: 'WP_POSTS',
		handler: requestPagedWpData,
		config: {
			method: 'GET',
			url: `${process.env.WP_URL}/wp-json/wp/v2/posts?_fields=${FIELDS.WP_POSTS.join(',')}`
		},
		reduce: res => res
	}),
	menus: () => ({
		id: 'WP_MENUS',
		handler: request,
		config: {
			method: 'GET',
			url: `${process.env.WP_URL}/wp-json/project-paradise/v1/menus`
		},
		reduce: res => res.data
	}),
	media: () => ({
		id: 'WP_MEDIA',
		handler: requestPagedWpData,
		config: {
			method: 'GET',
			url: `${process.env.WP_URL}/wp-json/wp/v2/media?_fields=${FIELDS.WP_MEDIA.join(',')}`
		},
		reduce: res => res
	}),
	categories: () => ({
		id: 'WP_CATEGORIES',
		handler: requestPagedWpData,
		config: {
			method: 'GET',
			url: `${process.env.WP_URL}/wp-json/wp/v2/categories?_fields=${FIELDS.WP_CATEGORIES.join(',')}`
		},
		reduce: res => res
	}),
	tags: () => ({
		id: 'WP_TAGS',
		handler: requestPagedWpData,
		config: {
			method: 'GET',
			url: `${process.env.WP_URL}/wp-json/wp/v2/tags?_fields=${FIELDS.WP_TAGS.join(',')}`
		},
		reduce: res => res
	})
};
