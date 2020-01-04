const path = require('path');
const { PAGE_STATES } = require('../enums');

module.exports = {
	wpPages: async ({ graphql, actions }) => {
		const queryResult = await graphql(`
			{
				pageOnFront: wpPage(states: { in: "${PAGE_STATES.PAGE_ON_FRONT}" }) {
					wpId
					path
					states
				}
				pageForPosts: wpPage(states: {in: "${PAGE_STATES.PAGE_FOR_POSTS}"}) {
					wpId
					path
					states
				}
				otherPages: allWpPage(filter: { states: { nin: ["${PAGE_STATES.PAGE_ON_FRONT}", "${PAGE_STATES.PAGE_FOR_POSTS}"] } }) {
					edges {
						node {
							wpId
							path
							states
						}
					}
				}
			}
		`);

		//#region [ rgba(255, 0, 0, 0.02) ] page on front

		const pageOnFront = queryResult.data.pageOnFront;
		if (pageOnFront) {
			const pageOnFrontData = {
				path: pageOnFront.path,
				component: path.resolve('./src/templates/PageOnFront.jsx'),
				context: {
					wpId: pageOnFront.wpId
				}
			};
			actions.createPage(pageOnFrontData);
		} else {
			const pageOnFrontData = {
				path: '/',
				component: path.resolve('./src/templates/PageOnFrontGeneral.jsx')
			};
			actions.createPage(pageOnFrontData);
		}

		//#endregion

		//#region [ rgba(0, 225, 0, 0.02) ] page for posts

		const pageForPosts = queryResult.data.pageForPosts;
		if (pageForPosts) {
			const pageForPostsData = {
				path: pageForPosts.path,
				component: path.resolve('./src/templates/PageForPosts.jsx'),
				context: {
					wpId: pageForPosts.wpId
				}
			};
			actions.createPage(pageForPostsData);
		}

		//#endregion

		//#region [ rgba(0, 0, 225, 0.02) ] other pages
		const otherPages = queryResult.data.otherPages.edges;
		otherPages.forEach(item => {
			const pageData = {
				path: item.node.path,
				component: path.resolve('./src/templates/WpPage.jsx'),
				context: {
					wpId: item.node.wpId
				}
			};

			actions.createPage(pageData);
		});

		//#endregion
	},
	wpPosts: async ({ graphql, actions }) => {
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

		data.forEach(item => {
			const pageData = {
				path: item.node.path,
				component: path.resolve('./src/templates/WpPost.jsx'),
				context: {
					wpId: item.node.wpId
				}
			};

			actions.createPage(pageData);
		});
	}
};
