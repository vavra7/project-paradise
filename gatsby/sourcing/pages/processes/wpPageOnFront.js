const { PAGE_STATES } = require('../../enums');
const { SHOW_ON_FRONT } = require('../../enums');
const path = require('path');

module.exports = async ({ graphql, actions }) => {
	const queryResult = await graphql(`
		{
			wpSettings {
				showOnFront
			}
			pageOnFront: wpPage(states: { in: "${PAGE_STATES.PAGE_ON_FRONT}" }) {
				wpId
				path
				states
			}
		}
	`);
	const pageOnFront = queryResult.data.pageOnFront;
	const showOnFront = queryResult.data.wpSettings.showOnFront;

	if (showOnFront === SHOW_ON_FRONT.PAGE && pageOnFront) {
		const pageOnFrontData = {
			path: pageOnFront.path,
			component: path.resolve('./src/templates/WpPageOnFront.jsx'),
			context: {
				wpPage: pageOnFront.wpId
			}
		};

		await actions.createPage(pageOnFrontData);
	} else {
		return Promise.resolve(true);
	}
};
