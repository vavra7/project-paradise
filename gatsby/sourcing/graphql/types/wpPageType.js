const { NODES } = require('../../nodes/types');

module.exports = {
	name: NODES.WP_PAGE,
	fields: {
		id: {
			type: 'ID!'
		},
		wpId: {
			type: 'Int!'
		},
		date: {
			type: 'Date!',
			resolve: item => item.date_gmt
		},
		modified: {
			type: 'Date!',
			resolve: item => item.modified_gmt
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
			type: 'Media',
			resolve: item => item.featured_media
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
