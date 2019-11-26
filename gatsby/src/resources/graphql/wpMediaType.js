const { GRAPHQL } = require('./types');

module.exports = {
	name: GRAPHQL.WP_MEDIA,
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
		wpType: {
			type: 'String!',
			resolve: item => item.type
		},
		wpPost: {
			type: 'Int',
			resolve: item => item.post
		},
		url: {
			type: 'String!',
			resolve: item => item.media_details.sizes.full.source_url
		}
	},
	extensions: {
		infer: false
	},
	interfaces: ['Node']
};
