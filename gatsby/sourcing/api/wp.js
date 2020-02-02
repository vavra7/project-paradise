const { request, requestPagedWpData } = require('./utils');

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
			url: `${process.env.WP_URL}/wp-json/wp/v2/settings`,
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
			url: `${process.env.WP_URL}/wp-json/wp/v2/pages`
		},
		reduce: res => res
	}),
	posts: () => ({
		id: 'WP_POSTS',
		handler: requestPagedWpData,
		config: {
			method: 'GET',
			url: `${process.env.WP_URL}/wp-json/wp/v2/posts`
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
			url: `${process.env.WP_URL}/wp-json/wp/v2/media`
		},
		reduce: res => res
	}),
	categories: () => ({
		id: 'WP_CATEGORIES',
		handler: requestPagedWpData,
		config: {
			method: 'GET',
			url: `${process.env.WP_URL}/wp-json/wp/v2/categories`
		},
		reduce: res => res
	}),
	tags: () => ({
		id: 'WP_TAGS',
		handler: requestPagedWpData,
		config: {
			method: 'GET',
			url: `${process.env.WP_URL}/wp-json/wp/v2/tags`
		},
		reduce: res => res
	})
};
