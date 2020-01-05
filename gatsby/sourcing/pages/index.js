const path = require('path');
const { PAGE_STATES } = require('../enums');

module.exports = {
	wpPages: async ({ graphql, actions }) => {
		const queryResult = await graphql(`
			{
				wpSettings {
					postsPerPage
				}
				allWpPost {
					edges {
						node {
							id
						}
					}
				}
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
		}

		//#endregion

		//#region [ rgba(0, 225, 0, 0.02) ] page for posts

		const pageForPosts = queryResult.data.pageForPosts;
		const postsPerPage = queryResult.data.wpSettings.postsPerPage;
		const postsCount = queryResult.data.allWpPost.edges.length;
		const numOfPages = Math.ceil(postsCount / postsPerPage);
		const pagination = {};

		const getPath = i => {
			if (pageForPosts) {
				if (i === 1) {
					return pageForPosts.path;
				} else {
					return `${pageForPosts.path}/${i}`;
				}
			} else {
				if (i === 1) {
					return '/';
				} else {
					return `/page/${i}`;
				}
			}
		};

		for (let i = 1; i <= numOfPages; i++) {
			pagination[i] = getPath(i);
		}

		for (let i = 1; i <= numOfPages; i++) {
			const pageForPostsData = {
				path: pagination[i],
				component: path.resolve('./src/templates/PageForPosts.jsx'),
				context: {
					wpId: pageForPosts ? pageForPosts.wpId : 0,
					limit: postsPerPage,
					skip: (i - 1) * postsPerPage,
					currentPage: i,
					pagination
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
