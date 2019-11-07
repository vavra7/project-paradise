const wpPageType = require('./wpPageType')
const wpPostType = require('./wpPostType')
const wpMenuType = require('./wpMenuType')

module.exports.GRAPHQL = {
	WP_POST: wpPostType,
	WP_PAGE: wpPageType,
	WP_MENU: wpMenuType
}