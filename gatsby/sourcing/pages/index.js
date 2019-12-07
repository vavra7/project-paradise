const path = require('path');

module.exports = {
	wpPages: async ({ graphql, actions }) => {
		const queryResult = await graphql(`
			query {
				allWpPage {
					edges {
						node {
							wpId
							slug
						}
					}
				}
			}
		`);
		const data = queryResult.data.allWpPage.edges;

		data.forEach(item => {
			const pageData = {
				path: `/${item.node.slug}`,
				component: path.resolve('./src/templates/wp-page.jsx'),
				context: {
					wpId: item.node.wpId
				}
			};

			actions.createPage(pageData);
		});
	},
	wpPosts: async ({ graphql, actions }) => {
		const queryResult = await graphql(`
			query {
				allWpPost {
					edges {
						node {
							wpId
							slug
						}
					}
				}
			}
		`);
		const data = queryResult.data.allWpPost.edges;

		data.forEach(item => {
			const pageData = {
				path: `/post/${item.node.slug}`,
				component: path.resolve('./src/templates/wp-post.jsx'),
				context: {
					wpId: item.node.wpId
				}
			};

			actions.createPage(pageData);
		});
	}
};
