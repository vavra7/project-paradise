const { NODES } = require('../../nodes/types');

module.exports = {
	name: NODES.WP_SETTINGS,
	fields: {
		id: {
			type: 'ID!'
		},
		homeUrl: {
			type: 'String!',
			resolve: item => item.home
		},
		siteTitle: {
			type: 'String',
			resolve: item => item.title
		},
		siteDescription: {
			type: 'String',
			resolve: item => item.description
		},
		showOnFront: {
			type: 'String',
			resolve: item => item.show_on_front
		},
		postsPerPage: {
			type: 'Int!',
			resolve: item => item.posts_per_page
		},
		tagBase: {
			type: 'String!',
			resolve: item => item.tag_base
		}
	},
	extensions: {
		infer: false
	},
	interfaces: ['Node']
};
