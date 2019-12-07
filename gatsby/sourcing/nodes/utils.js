/**
 * Creates common nodes internal
 * https://www.gatsbyjs.org/docs/node-interface/
 */
const createInternal = ({ createContentDigest }, node, item) => ({
	type: node,
	content: JSON.stringify(item),
	contentDigest: createContentDigest(item)
});

/**
 * Loops through array of node inputs and creates nodes.
 */
const createNodes = ({ actions }, nodeData) => {
	nodeData.forEach(item => {
		actions.createNode(item);
	});
};

module.exports = {
	createInternal,
	createNodes
};
