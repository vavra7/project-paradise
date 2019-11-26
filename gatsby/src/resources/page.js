const { TYPES } = require('./types');
const { createWpPages } = require('./utils');

const URL_DIRECTORY = {
	WP_PAGE: '',
	WP_POST: '/post'
};
const TEMPLATE_PATH = {
	WP_PAGE: './src/templates/wp-page.jsx',
	WP_POST: './src/templates/wp-post.jsx'
};

module.exports = {
	[TYPES.WP_PAGE]: async dispatch => {
		const queryResult = await dispatch.graphql(`
			query {
				allWpPage {
					edges {
						node {
							id
							wpId
							featuredMedia
							slug
						}
					}
				}
			}
		`);
		const data = queryResult.data.allWpPage.edges;

		createWpPages(dispatch, {
			data: data,
			urlDirectory: URL_DIRECTORY.WP_PAGE,
			templatePath: TEMPLATE_PATH.WP_PAGE
		});
	},
	[TYPES.WP_POST]: async dispatch => {
		const queryResult = await dispatch.graphql(`
			query {
				allWpPost {
					edges {
						node {
							id
							wpId
							featuredMedia
							slug
						}
					}
				}
			}
		`);
		const data = queryResult.data.allWpPost.edges;

		createWpPages(dispatch, {
			data: data,
			urlDirectory: URL_DIRECTORY.WP_POST,
			templatePath: TEMPLATE_PATH.WP_POST
		});
	}
};
