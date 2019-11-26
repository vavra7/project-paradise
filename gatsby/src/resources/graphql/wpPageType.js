const { GRAPHQL } = require('./types');

module.exports = {
	name: GRAPHQL.WP_PAGE,
	fields: {
		id: {
			type: 'ID!'
		},
		wpId: {
			type: 'Int!'
		},
		date: {
			type: 'Date!'
		},
		modified: {
			type: 'Date!'
		},
		slug: {
			type: 'String!'
		},
		status: {
			type: 'String!'
		},
		wpType: {
			type: 'String!',
			resolve: item => item.type
		},
		title: {
			type: 'String',
			resolve: item => item.title.rendered
		},
		featuredMedia: {
			type: 'Int',
			resolve: item => (item.featured_media ? item.featured_media : null)
		},
		content: {
			type: 'String',
			resolve: item => item.content.rendered
		},
		excerpt: {
			type: 'String',
			resolve: item => item.excerpt.rendered
		}
	},
	extensions: {
		infer: false
	},
	interfaces: ['Node']
};
