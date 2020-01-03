require('dotenv').config({
	path: `.env.${process.env.NODE_ENV}`
});

const auth = require('./sourcing/auth');
const nodes = require('./sourcing/nodes');
const graphql = require('./sourcing/graphql');
const pages = require('./sourcing/pages');

module.exports.sourceNodes = async ({ actions, cache, createNodeId, createContentDigest, reporter, store }) => {
	const apiMethods = {
		actions,
		cache,
		createNodeId,
		createContentDigest,
		store,
		reporter
	};

	await auth.generateToken(apiMethods);

	await Promise.all([
		nodes.wpSettings(apiMethods),
		nodes.wpPosts(apiMethods),
		nodes.wpPages(apiMethods),
		nodes.wpMenus(apiMethods),
		nodes.files(apiMethods).then(() => {
			nodes.wpMedia(apiMethods);
		})
	]);
};

module.exports.createSchemaCustomization = ({ actions, schema }) => {
	const apiMethods = {
		actions,
		schema
	};

	graphql.initCreateGraphqlTypes(apiMethods);
};

module.exports.createPages = async ({ actions, graphql }) => {
	const apiMethods = {
		actions,
		graphql
	};

	await Promise.all([pages.wpPages(apiMethods), pages.wpPosts(apiMethods)]);
};
