const path = require('path');

module.exports = async ({ graphql, actions }) => {
	const queryResult = await graphql(`
		query {
			allWpPost {
				edges {
					node {
						wpId
						path
					}
				}
			}
		}
	`);
	const data = queryResult.data.allWpPost.edges;

	if (data.length) {
		const promises = data.map(item => {
			const pageData = {
				path: item.node.path,
				component: path.resolve('./src/templates/WpPost.jsx'),
				context: {
					wpPost: item.node.wpId
				}
			};

			return actions.createPage(pageData);
		});

		await Promise.all(promises);
	} else {
		return Promise.resolve(true);
	}
};
