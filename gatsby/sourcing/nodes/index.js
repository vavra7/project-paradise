const api = require('../api');
const { NODES } = require('./types');
const { CACHE_KEYS } = require('../enums');
const { requestFromApi } = require('../api/utils');
const { createInternal, createNodes } = require('./utils');
const { createRemoteFileNode } = require(`gatsby-source-filesystem`);

module.exports = {
	wpSettings: async apiMethods => {
		const variables = {
			token: await apiMethods.cache.get(CACHE_KEYS.WP_AUTH_TOKEN)
		};
		const data = await requestFromApi(apiMethods, api.wp.settings(variables));
		//TODO: node
	},
	wpPages: async apiMethods => {
		const data = await requestFromApi(apiMethods, api.wp.pages());
		const nodeData = data.map(item =>
			Object.assign({}, item, {
				id: apiMethods.createNodeId(`${NODES.WP_PAGE}${item.id}`),
				wpId: item.id,
				parent: null,
				children: [],
				internal: createInternal(apiMethods, NODES.WP_PAGE, item)
			})
		);
		createNodes(apiMethods, nodeData);
	},
	wpPosts: async apiMethods => {
		const data = await requestFromApi(apiMethods, api.wp.posts());
		const nodeData = data.map(item =>
			Object.assign({}, item, {
				id: apiMethods.createNodeId(`${NODES.WP_POST}${item.id}`),
				wpId: item.id,
				parent: null,
				children: [],
				internal: createInternal(apiMethods, NODES.WP_POST, item)
			})
		);
		createNodes(apiMethods, nodeData);
	},
	wpMenus: async apiMethods => {
		const data = await requestFromApi(apiMethods, api.wp.menus());
		const nodeData = data.map(item =>
			Object.assign({}, item, {
				id: apiMethods.createNodeId(`${NODES.WP_MENU}${item.id}`),
				wpId: item.id,
				parent: null,
				children: [],
				internal: createInternal(apiMethods, NODES.WP_MENU, item)
			})
		);
		createNodes(apiMethods, nodeData);
	},
	files: async apiMethods => {
		const data = await requestFromApi(apiMethods, api.wp.media());

		await apiMethods.cache.set(CACHE_KEYS.WP_MEDIA_DATA, data);

		for (let index = 0; index < data.length; index++) {
			const file = data[index];

			await createRemoteFileNode({
				url: file.source_url,
				store: apiMethods.store,
				cache: apiMethods.cache,
				createNode: apiMethods.actions.createNode,
				createNodeId: apiMethods.createNodeId
			});
		}
	},
	wpMedia: async apiMethods => {
		const data = await apiMethods.cache.get(CACHE_KEYS.WP_MEDIA_DATA);

		const nodeData = data.map(item =>
			Object.assign({}, item, {
				id: apiMethods.createNodeId(`${NODES.WP_MEDIA}${item.id}`),
				wpId: item.id,
				parent: null,
				children: [],
				internal: createInternal(apiMethods, NODES.WP_MEDIA, item)
			})
		);
		createNodes(apiMethods, nodeData);
	}
};
