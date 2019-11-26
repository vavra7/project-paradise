const { TYPES } = require('./types');
const { GRAPHQL } = require('./graphql/types');
const { fetchPagedWpData, fetchWpData, prepareWpDataForNode, createNodes, createGraphqlType } = require('./utils');
const graphql = require('./graphql');

const ENDPOINT = {
	WP_PAGE: '/wp-json/wp/v2/pages',
	WP_POST: '/wp-json/wp/v2/posts',
	WP_MENU: '/wp-json/wp/v2/menus',
	WP_MEDIA: '/wp-json/wp/v2/media'
};

module.exports = {
	[TYPES.WP_PAGE]: async dispatch => {
		const data = await fetchPagedWpData(ENDPOINT.WP_PAGE);
		const nodeData = prepareWpDataForNode(dispatch, data, GRAPHQL.WP_PAGE);
		createNodes(dispatch, nodeData);
		createGraphqlType(dispatch, graphql.wpPage);
	},
	[TYPES.WP_POST]: async dispatch => {
		const data = await fetchPagedWpData(ENDPOINT.WP_POST);
		const nodeData = prepareWpDataForNode(dispatch, data, GRAPHQL.WP_POST);
		createNodes(dispatch, nodeData);
		createGraphqlType(dispatch, graphql.wpPost);
	},
	[TYPES.WP_MENU]: async dispatch => {
		const data = await fetchWpData(ENDPOINT.WP_MENU);
		const nodeData = prepareWpDataForNode(dispatch, data, GRAPHQL.WP_MENU);
		createNodes(dispatch, nodeData);
		createGraphqlType(dispatch, graphql.wpMenu);
	},
	[TYPES.WP_MEDIA]: async dispatch => {
		const data = await fetchPagedWpData(ENDPOINT.WP_MEDIA);
		const nodeData = prepareWpDataForNode(dispatch, data, GRAPHQL.WP_MEDIA);
		createNodes(dispatch, nodeData);
		createGraphqlType(dispatch, graphql.wpMedia);
	}
};
