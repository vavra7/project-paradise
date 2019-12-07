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
 * Returns name of child node
 */
const getChildName = node => {
	return `child${node.charAt(0).toUpperCase() + node.slice(1)}`;
};

module.exports = {
	createGraphqlTypes,
	getChildName
};
