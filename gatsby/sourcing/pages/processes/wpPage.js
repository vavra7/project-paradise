const path = require('path');
const { PAGE_STATES } = require('../../enums');

module.exports = async ({ graphql, actions }) => {
	const queryResult = await graphql(`
		query {
			allWpPage(filter: {
					states: {
						nin: ["${PAGE_STATES.PAGE_ON_FRONT}", "${PAGE_STATES.PAGE_FOR_POSTS}"]
					}
				}) {
				edges {
					node {
						wpId
						path
					}
				}
			}
		}
	`);
	const data = queryResult.data.allWpPage.edges;

	if (data.length) {
		const promises = data.map(item => {
			const pageData = {
				path: item.node.path,
				component: path.resolve('./src/templates/WpPage.jsx'),
				context: {
					wpPage: item.node.wpId
				}
			};

			return actions.createPage(pageData);
		});

		await Promise.all(promises);
	} else {
		return Promise.resolve(true);
	}
};
