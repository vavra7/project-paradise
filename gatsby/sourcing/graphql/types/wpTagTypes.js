const { NODES } = require('../../nodes/types');

module.exports = {
	name: NODES.WP_TAG,
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
		}
	},
	extensions: {
		infer: false
	},
	interfaces: ['Node']
};
