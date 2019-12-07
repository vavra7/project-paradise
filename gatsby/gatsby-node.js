require('dotenv').config({
	path: `.env.${process.env.NODE_ENV}`
});

const nodes = require('./sourcing/nodes');
const graphql = require('./sourcing/graphql');
const pages = require('./sourcing/pages');

module.exports.sourceNodes = async ({ actions, cache, createNodeId, createContentDigest, reporter, store }) => {
	const dispatch = {
		actions,
		cache,
		createNodeId,
		createContentDigest,
		store,
		reporter
	};

	await Promise.all([
		nodes.wpPages(dispatch),
		nodes.wpPosts(dispatch),
		nodes.wpMenus(dispatch),
		nodes.files(dispatch).then(() => {
			nodes.wpMedia(dispatch);
		})
	]);
};

module.exports.createSchemaCustomization = ({ actions, schema }) => {
	const dispatch = {
		actions,
		schema
	};

	graphql.initCreateGraphqlTypes(dispatch);
};

module.exports.createPages = async ({ actions, graphql }) => {
	const dispatch = {
		actions,
		graphql
	};

	await Promise.all([pages.wpPages(dispatch), pages.wpPosts(dispatch)]);
};
