const { TYPES } = require('../types');

module.exports = [
	{
		name: TYPES.WP_MENU,
		fields: {
			id: {
				type: 'ID!'
			},
			locationSlug: {
				type: 'String!',
				resolve: item => item.location_slug
			},
			locationName: {
				type: 'String!',
				resolve: item => item.location_name
			},
			menuWpId: {
				type: 'Int',
				resolve: item => item.menu_id
			},
			menuSlug: {
				type: 'String',
				resolve: item => item.menu_slug
			},
			menuName: {
				type: 'String',
				resolve: item => item.menu_name
			},
			itemsCount: {
				type: 'Int!',
				resolve: item => item.items_count
			},
			items: {
				type: '[MenuItems]'
			}
		},
		extensions: {
			infer: false
		},
		interfaces: ['Node']
	},
	{
		name: 'MenuItems',
		fields: {
			wpId: {
				type: 'Int!',
				resolve: item => item.id
			},
			title: {
				type: 'String!'
			},
			url: {
				type: 'String!'
			},
			path: {
				type: 'String!'
			},
			type: {
				type: 'String!'
			},
			menuItemParent: {
				type: 'Int!',
				resolve: item => item.menu_item_parent
			},
			menuOrder: {
				type: 'Int!',
				resolve: item => item.menu_order
			},
			internal: {
				type: 'Boolean!'
			}
		}
	}
];
