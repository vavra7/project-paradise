const { NODES } = require('../../nodes/types');

module.exports = {
	name: NODES.WP_CATEGORY,
	fields: {
		id: {
			type: 'ID!'
		},
		wpId: {
			type: 'Int!'
		},
		name: {
			type: 'String!'
		},
		path: {
			type: 'String!'
		},
		link: {
			type: 'String!'
		},
		count: {
			type: 'Int!'
		}
	},
	extensions: {
		infer: false
	},
	interfaces: ['Node']
};
