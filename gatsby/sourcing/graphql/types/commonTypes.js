const { NODES } = require('../../nodes/types');
const { getChildName } = require('../utils');

module.exports = [
	{
		name: 'Media',
		fields: {
			id: {
				type: 'Int!',
				resolve: item => item
			},
			[getChildName(NODES.WP_MEDIA)]: {
				type: NODES.WP_MEDIA,
				resolve: (item, args, context, info) =>
					context.nodeModel.getAllNodes({ type: NODES.WP_MEDIA }).find(node => node.wpId === item)
			}
		}
	},
	{
		name: 'Category',
		fields: {
			id: {
				type: 'Int!',
				resolve: item => item
			},
			[getChildName(NODES.WP_CATEGORY)]: {
				type: NODES.WP_CATEGORY,
				resolve: (item, args, context, info) =>
					context.nodeModel.getAllNodes({ type: NODES.WP_CATEGORY }).find(node => node.wpId === item)
			}
		}
	},
	{
		name: 'Tag',
		fields: {
			id: {
				type: 'Int!',
				resolve: item => item
			},
			[getChildName(NODES.WP_TAG)]: {
				type: NODES.WP_TAG,
				resolve: (item, args, context, info) =>
					context.nodeModel.getAllNodes({ type: NODES.WP_TAG }).find(node => node.wpId === item)
			}
		}
	},
	{
		name: 'PostMeta',
		fields: {
			title: {
				type: 'String',
				resolve: item => item._title
			},
			description: {
				type: 'String',
				resolve: item => item._description
			},
			ogTitle: {
				type: 'String',
				resolve: item => item._og_title
			},
			ogDescription: {
				type: 'String',
				resolve: item => item._og_description
			},
			ogImage: {
				type: 'String',
				resolve: (item, args, context, info) => {
					const media = context.nodeModel
						.getAllNodes({ type: NODES.WP_MEDIA })
						.find(node => node.wpId === item._og_image);

					if (media) {
						const sizes = media.media_details.sizes;

						return sizes.medium_large ? sizes.medium_large.source_url : sizes.full.source_url;
					} else {
						return '';
					}
				}
			}
		}
	}
];
