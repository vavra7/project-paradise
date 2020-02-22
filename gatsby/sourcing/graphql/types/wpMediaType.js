const { NODES } = require('../../nodes/types');
const { getChildName } = require('../utils');

module.exports = [
	{
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
			mediaDetails: {
				type: 'MediaDetails',
				resolve: item => item.media_details
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
	},
	{
		name: 'MediaDetails',
		fields: {
			file: {
				type: 'String'
			},
			sizes: {
				type: 'MediaDetailsSizes'
			}
		}
	},
	{
		name: 'MediaDetailsSizes',
		fields: {
			mediumLarge: {
				type: 'MediaDetailsSize',
				resolve: item => item.medium_large
			},
			full: {
				type: 'MediaDetailsSize'
			}
		}
	},
	{
		name: 'MediaDetailsSize',
		fields: {
			file: {
				type: 'String!'
			},
			sourceUrl: {
				type: 'String!',
				resolve: item => item.source_url
			}
		}
	}
];
