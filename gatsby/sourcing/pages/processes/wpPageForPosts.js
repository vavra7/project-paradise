const { PAGE_STATES } = require('../../enums');
const { SHOW_ON_FRONT } = require('../../enums');
const { getPagination } = require('../utils');
const path = require('path');

module.exports = async ({ graphql, actions }) => {
	const queryResult = await graphql(`
		{
			wpSettings {
				postsPerPage
				showOnFront
			}
			allWpPost {
				pageInfo {
					itemCount
				}
			}
			pageForPosts: wpPage(states: {in: "${PAGE_STATES.PAGE_FOR_POSTS}"}) {
				wpId
				path
				states
			}
		}
	`);
	const showOnFront = queryResult.data.wpSettings.showOnFront;
	const pageForPosts = queryResult.data.pageForPosts;
	const postsPerPage = queryResult.data.wpSettings.postsPerPage;
	const postsCount = queryResult.data.allWpPost.pageInfo.itemCount;
	const numOfPages = Math.ceil(postsCount / postsPerPage);

	if (showOnFront === SHOW_ON_FRONT.PAGE && pageForPosts) {
		const pagination = getPagination(pageForPosts.path, numOfPages);

		for (let i = 1; i <= numOfPages; i++) {
			const page = {
				path: pagination[i],
				component: path.resolve('./src/templates/WpPageForPosts.jsx'),
				context: {
					wpPage: pageForPosts.wpId,
					limit: postsPerPage,
					skip: (i - 1) * postsPerPage,
					currentPage: i,
					pagination
				}
			};

			await actions.createPage(page);
		}
	} else {
		return Promise.resolve(true);
	}
};
