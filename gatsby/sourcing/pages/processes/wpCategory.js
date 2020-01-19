module.exports = async ({ graphql, actions }) => {
	const queryResult = await graphql(`
		query {
			allWpCategory {
				edges {
					node {
						id
						wpId
						name
						path
						count
					}
				}
			}
		}
	`);
	const categories = queryResult.data.allWpCategory.edges.map(node => node.node);

	console.log(categories);

	return Promise.resolve(true);
};
