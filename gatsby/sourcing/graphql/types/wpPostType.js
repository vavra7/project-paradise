const { NODES } = require('../../nodes/types');
const { getMediaIdsList } = require('../utils');

module.exports = {
	name: NODES.WP_POST,
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
		media: {
			type: '[Media]',
			resolve: item => getMediaIdsList(item)
		},
		content: {
			type: 'String',
			resolve: item => item.content.rendered
		},
		blocks: {
			type: 'String',
			resolve: item => JSON.stringify(item.blocks)
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