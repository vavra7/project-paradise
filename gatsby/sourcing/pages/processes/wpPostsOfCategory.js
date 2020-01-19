const { getPagination } = require('../utils');
const path = require('path');

module.exports = async ({ graphql, actions }) => {
	const queryResult = await graphql(`
		query {
			wpSettings {
				postsPerPage
			}
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
	const postsPerPage = queryResult.data.wpSettings.postsPerPage;

	if (categories.length) {
		const categoryPromises = categories.map(category => {
			const postsCount = category.count;
			const numOfPages = Math.ceil(postsCount / postsPerPage);
			const pagination = getPagination(category.path, numOfPages);
			const pagePromises = [];

			for (let i = 1; i <= numOfPages; i++) {
				const page = {
					path: pagination[i],
					component: path.resolve('./src/templates/WpPostsOfCategory.jsx'),
					context: {
						wpCategoryId: category.wpId,
						limit: postsPerPage,
						skip: (i - 1) * postsPerPage,
						currentPage: i,
						pagination
					}
				};

				pagePromises.push(actions.createPage(page));
			}

			return Promise.all(pagePromises);
		});

		await Promise.all(categoryPromises);
	} else {
		return Promise.resolve(true);
	}
};
