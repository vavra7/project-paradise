require('dotenv').config({
	path: `.env.${process.env.NODE_ENV}`
});
const axios = require('axios');
const path = require('path');

/**
 * Fetching and returns WP data at endpoint without paging support.
 */
const fetchWpData = async endpoint => {
	console.log(`   - start fetching from "${process.env.WP_URL}${endpoint}"`);
	const response = await axios.get(`${process.env.WP_URL}${endpoint}`);
	try {
		if (!response.data.length) {
			throw new Error(`\x1b[33mThere are no data at WP endpoint '${endpoint}'.`);
		}
	} catch (err) {
		console.log(err);
	}

	return response.data;
};

/**
 * Fetching and returns all WP data at endpoint with paging support.
 */
const fetchAllWpData = async endpoint => {
	console.log(`   - start fetching from "${process.env.WP_URL}${endpoint}"`);
	const perPage = 50; // WP supports max 100
	const data = [];

	const firstResponse = await axios.get(`${process.env.WP_URL}${endpoint}?per_page=${perPage}&page=1`);
	const totalPages = firstResponse.headers['x-wp-totalpages'];
	data.push(...firstResponse.data);

	if (totalPages > 1) {
		for (let i = 2; i <= totalPages; i++) {
			const response = await axios.get(`${process.env.WP_URL}${endpoint}?per_page=${perPage}&page=${i}`);
			data.push(...response.data);
		}
	}

	try {
		if (!data.length) {
			throw new Error(`\x1b[33mThere are no data at WP endpoint '${endpoint}'.`);
		}
	} catch (err) {
		console.log(err);
	}

	return data;
};

/**
 * Loops through array of raw fetched data from WP,
 * transforms them and returns array of node inputs.
 */
const prepareAllWpData = ({ createNodeId, createContentDigest, nodeType }, data) => {
	try {
		if (data.length && !data[0].id) {
			throw new ReferenceError(`\x1b[31mThe data type '${nodeType}' fetched form WP doesn't contain id.`);
		}

		return data.map(item =>
			Object.assign({}, item, {
				id: createNodeId(`${nodeType}-${item.id}`),
				wpId: item.id,
				parent: null,
				children: [],
				internal: {
					type: nodeType,
					content: JSON.stringify(item),
					contentDigest: createContentDigest(item)
				}
			})
		);
	} catch (err) {
		console.log(err);
	}
};

/**
 * Loops through array of node inputs and creates nodes.
 */
const createAllNodes = ({ createNode }, data) => {
	data.forEach(item => {
		createNode(item);
	});
};

/**
 * Function allowing to use forEach asynchronously.
 */
const asyncForEach = async (array, callback) => {
	for (let i = 0; i < array.length; i++) {
		await callback(array[i], i, array);
	}
};

/**
 * Builds graphql type objects and then creates them.
 */
const createGraphqlType = ({ schema, createTypes }, data) => {
	const typeDefs = [];
	if (Array.isArray(data)) {
		data.forEach(item => {
			typeDefs.push(schema.buildObjectType(item));
		});
	} else {
		typeDefs.push(schema.buildObjectType(data));
	}
	createTypes(typeDefs);
};

/**
 * Creates pages from all provided WP data.
 */
const createAllWpPages = ({ createPage }, { data, urlDirectory, templatePath }) => {
	data.forEach(item => {
		const pageData = {
			path: `${urlDirectory}/${item.node.slug}`,
			component: path.resolve(templatePath),
			context: {
				id: item.node.id
			}
		};

		createPage(pageData);
	});
};

module.exports = {
	fetchWpData: fetchWpData,
	fetchAllWpData: fetchAllWpData,
	prepareAllWpData: prepareAllWpData,
	createAllNodes: createAllNodes,
	asyncForEach: asyncForEach,
	createGraphqlType: createGraphqlType,
	createAllWpPages: createAllWpPages
};
