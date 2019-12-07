const { NODES } = require('../../nodes/types');
const { getChildName } = require('../utils');

module.exports = [
	{
		name: 'FeaturedMedia',
		fields: {
			id: {
				type: 'Int',
				resolve: item => (item.featured_media ? item.featured_media : null)
			},
			[getChildName(NODES.WP_MEDIA)]: {
				type: NODES.WP_MEDIA,
				resolve: (item, args, context, info) =>
					context.nodeModel.getAllNodes({ type: NODES.WP_MEDIA }).find(node => node.wpId === item.featured_media)
			}
		}
	}
];
