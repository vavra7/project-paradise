/**
 * Builds graphql type objects and then creates them.
 */
const createGraphqlTypes = ({ actions, schema }, graphqlTypes) => {
	const typeDefs = [];

	if (Array.isArray(graphqlTypes)) {
		graphqlTypes.forEach(item => {
			typeDefs.push(schema.buildObjectType(item));
		});
	} else {
		typeDefs.push(schema.buildObjectType(graphqlTypes));
	}
	actions.createTypes(typeDefs);
};

/**
 * Extract all media from post and returns its list of ids.
 */
const getMediaIdsList = post => {
	let ids = [];

	const enlistId = id => {
		if (!ids.includes(id)) ids.push(id);
	};

	const addMediaFromBlocks = blocks => {
		blocks.forEach(block => {
			if (block.blockName === 'gatsby/image') {
				if (block.attrs.id) enlistId(block.attrs.id);
			}

			if (block.innerBlocks.length) addMediaFromBlocks(block.innerBlocks);
		});
	};

	if (post.featured_media) enlistId(post.featured_media);

	addMediaFromBlocks(post.blocks);

	return ids;
};

/**
 * Returns name of child node
 */
const getChildName = node => {
	return `child${node.charAt(0).toUpperCase() + node.slice(1)}`;
};

module.exports = {
	createGraphqlTypes,
	getChildName,
	getMediaIdsList
};
