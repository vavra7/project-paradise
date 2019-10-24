const { TYPES } = require('./types');
const { fetchAllWpData, fetchWpData, prepareAllWpData, createAllNodes, createGraphqlType } = require('./utils');
const { GRAPHQL } = require('./graphql');

const ENDPOINT = {
	WP_PAGE: '/wp-json/wp/v2/pages',
	WP_POST: '/wp-json/wp/v2/posts',
	WP_MENU: '/wp-json/gatsby/v1/menus'
};

module.exports = {
	[TYPES.WP_PAGE]: async dispatch => {
		const data = await fetchAllWpData(ENDPOINT.WP_PAGE);
		const nodeData = prepareAllWpData(dispatch, data);
		createAllNodes(dispatch, nodeData);
		createGraphqlType(dispatch, GRAPHQL.WP_PAGE);
	},
	[TYPES.WP_POST]: async dispatch => {
		const data = await fetchAllWpData(ENDPOINT.WP_POST);
		const nodeData = prepareAllWpData(dispatch, data);
		createAllNodes(dispatch, nodeData);
		createGraphqlType(dispatch, GRAPHQL.WP_POST);
	},
	[TYPES.WP_MENU]: async dispatch => {
		const data = await fetchWpData(ENDPOINT.WP_MENU);
		const nodeData = prepareAllWpData(dispatch, data);
		createAllNodes(dispatch, nodeData);
		createGraphqlType(dispatch, GRAPHQL.WP_MENU);
	}
};
