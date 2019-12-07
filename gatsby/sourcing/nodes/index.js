const api = require('../api');
const { NODES } = require('./types');
const { requestFromApi } = require('../api/utils');
const { createInternal, createNodes } = require('./utils');
const { createRemoteFileNode } = require(`gatsby-source-filesystem`);

module.exports = {
	wpPages: async dispatch => {
		const data = await requestFromApi(dispatch, api.wp.pages);
		const nodeData = data.map(item =>
			Object.assign({}, item, {
				id: dispatch.createNodeId(`${NODES.WP_PAGE}${item.id}`),
				wpId: item.id,
				parent: null,
				children: [],
				internal: createInternal(dispatch, NODES.WP_PAGE, item)
			})
		);
		createNodes(dispatch, nodeData);
	},
	wpPosts: async dispatch => {
		const data = await requestFromApi(dispatch, api.wp.posts);
		const nodeData = data.map(item =>
			Object.assign({}, item, {
				id: dispatch.createNodeId(`${NODES.WP_POST}${item.id}`),
				wpId: item.id,
				parent: null,
				children: [],
				internal: createInternal(dispatch, NODES.WP_POST, item)
			})
		);
		createNodes(dispatch, nodeData);
	},
	wpMenus: async dispatch => {
		const data = await requestFromApi(dispatch, api.wp.menus);
		const nodeData = data.map(item =>
			Object.assign({}, item, {
				id: dispatch.createNodeId(`${NODES.WP_MENU}${item.id}`),
				wpId: item.id,
				parent: null,
				children: [],
				internal: createInternal(dispatch, NODES.WP_MENU, item)
			})
		);
		createNodes(dispatch, nodeData);
	},
	files: async dispatch => {
		const data = await requestFromApi(dispatch, api.wp.media);

		await dispatch.cache.set('wpMediaData', data);

		for (let index = 0; index < data.length; index++) {
			const file = data[index];

			await createRemoteFileNode({
				url: file.source_url,
				store: dispatch.store,
				cache: dispatch.cache,
				createNode: dispatch.actions.createNode,
				createNodeId: dispatch.createNodeId
			});
		}
	},
	wpMedia: async dispatch => {
		const data = await dispatch.cache.get('wpMediaData');

		const nodeData = data.map(item =>
			Object.assign({}, item, {
				id: dispatch.createNodeId(`${NODES.WP_MEDIA}${item.id}`),
				wpId: item.id,
				parent: null,
				children: [],
				internal: createInternal(dispatch, NODES.WP_MEDIA, item)
			})
		);
		createNodes(dispatch, nodeData);
	}
};
