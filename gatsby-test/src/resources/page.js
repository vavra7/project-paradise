const { TYPE } = require('./type');
const { createAllWpPages } = require('./utils');

const URL_DIRECTORY = {
	WP_PAGE: '',
	WP_POST: '/post'
};
const TEMPLATE_PATH = {
	WP_PAGE: './src/templates/wp-page.jsx',
	WP_POST: './src/templates/wp-post.jsx'
};

module.exports = {
	[TYPE.WP_PAGE]: async dispatch => {
		const queryResult = await dispatch.graphql(`
			query {
				allWpPage {
					edges {
						node {
							id
							slug
						}
					}
				}
			}
		`);
		const data = queryResult.data.allWpPage.edges;

		createAllWpPages(dispatch, {
			data: data,
			urlDirectory: URL_DIRECTORY.WP_PAGE,
			templatePath: TEMPLATE_PATH.WP_PAGE
		});
	},
	[TYPE.WP_POST]: async dispatch => {
		const queryResult = await dispatch.graphql(`
			query {
				allWpPost {
					edges {
						node {
							id
							slug
						}
					}
				}
			}
		`);
		const data = queryResult.data.allWpPost.edges;

		createAllWpPages(dispatch, {
			data: data,
			urlDirectory: URL_DIRECTORY.WP_POST,
			templatePath: TEMPLATE_PATH.WP_POST
		});
	}
};
