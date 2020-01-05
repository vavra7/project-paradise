const { createGraphqlTypes } = require('./utils');
const common = require('./types/commonTypes');
const wpPage = require('./types/wpPageType');
const wpPost = require('./types/wpPostType');
const wpMenu = require('./types/wpMenuType');
const wpMedia = require('./types/wpMediaType');
const wpSettings = require('./types/wpSettingsType');

const graphqlTypes = [common, wpPage, wpPost, wpMenu, wpMedia, wpSettings];

const initCreateGraphqlTypes = apiMethods => {
	graphqlTypes.forEach(graphqlType => createGraphqlTypes(apiMethods, graphqlType));
};

module.exports = {
	initCreateGraphqlTypes
};
