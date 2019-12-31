const { NODES } = require('../../nodes/types');
const { getChildName } = require('../utils');

module.exports = {
	name: NODES.WP_MEDIA,
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
		attachedTo: {
			type: 'Int',
			resolve: item => item.post
		},
		altText: {
			type: 'String',
			resolve: item => item.alt_text
		},
		url: {
			type: 'String!',
			resolve: item => item.source_url
		},
		[getChildName('File')]: {
			type: 'File',
			resolve: (item, args, context, info) =>
				context.nodeModel.getAllNodes({ type: 'File' }).find(node => node.url === item.source_url)
		}
	},
	extensions: {
		infer: false
	},
	interfaces: ['Node']
};
