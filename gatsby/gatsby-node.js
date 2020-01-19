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

	/**
	 * Generates and caches token for use during build time.
	 */
	await auth.generateToken(apiMethods);

	/**
	 * Fetches data from APIs and creates nodes.
	 */
	await Promise.all([
		nodes.wpSettings(apiMethods),
		nodes.wpPosts(apiMethods),
		nodes.wpPages(apiMethods),
		nodes.wpMenus(apiMethods),
		nodes.files(apiMethods).then(() => {
			nodes.wpMedia(apiMethods);
		}),
		nodes.wpCategories(apiMethods)
	]);
};

module.exports.createSchemaCustomization = ({ actions, schema }) => {
	const apiMethods = {
		actions,
		schema
	};

	/**
	 * Applies graphql schema to data used in gatsby
	 */
	graphql.initCreateGraphqlTypes(apiMethods);
};

module.exports.createPages = async ({ actions, graphql }) => {
	const apiMethods = {
		actions,
		graphql
	};

	/**
	 * Creates static pages
	 */
	await pages.initCretePages(apiMethods);
};

exports.onCreatePage = async ({ page, actions }) => {
	if (page.path.match(/^\/app/)) {
		page.matchPath = '/app/*';

		/**
		 * Recreates page with value under key 'matchPath' saying this page
		 * is at client side only route
		 */
		await actions.createPage(page);
	}
};
