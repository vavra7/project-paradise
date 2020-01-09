const { NODES } = require('../../nodes/types');

module.exports = {
	name: NODES.WP_SETTINGS,
	fields: {
		id: {
			type: 'ID!'
		},
		siteTitle: {
			type: 'String',
			resolve: item => item.title
		},
		postsPerPage: {
			type: 'Int!',
			resolve: item => item.posts_per_page
		}
	},
	extensions: {
		infer: false
	},
	interfaces: ['Node']
};
