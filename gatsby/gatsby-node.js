const { TYPES } = require('./src/resources/types');
const { asyncForEach } = require('./src/resources/utils');
const node = require('./src/resources/node');
const page = require('./src/resources/page');

const types = Object.values(TYPES);

module.exports.sourceNodes = async ({ actions, createNodeId, createContentDigest, schema }) => {
	const dispatch = {
		createNodeId: createNodeId,
		createContentDigest: createContentDigest,
		createNode: actions.createNode,
		schema: schema,
		createTypes: actions.createTypes
	};

	await asyncForEach(types, async type => {
		if (node[type]) {
			dispatch.nodeType = type;
			await node[type](dispatch);
		}
	});
};

module.exports.createPages = async ({ graphql, actions }) => {
	const dispatch = {
		graphql: graphql,
		createPage: actions.createPage
	};

	await asyncForEach(types, async type => {
		if (page[type]) {
			page[type](dispatch);
		}
	});
};
