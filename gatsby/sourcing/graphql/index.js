const { createGraphqlTypes } = require('./utils');
const common = require('./types/commonTypes');
const wpPage = require('./types/wpPageType');
const wpPost = require('./types/wpPostType');
const wpMenu = require('./types/wpMenuType');
const wpMedia = require('./types/wpMediaType');

const graphqlTypes = [common, wpPage, wpPost, wpMenu, wpMedia];

const initCreateGraphqlTypes = dispatch => {
	graphqlTypes.forEach(graphqlType => createGraphqlTypes(dispatch, graphqlType));
};

module.exports = {
	initCreateGraphqlTypes
};
