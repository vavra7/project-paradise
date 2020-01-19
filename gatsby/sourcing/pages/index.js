const postsOnFront = require('./processes/postsOnFront');
const pageOnFront = require('./processes/pageOnFront');
const pageForPosts = require('./processes/pageForPosts');
const wpPage = require('./processes/wpPage');
const wpPost = require('./processes/wpPost');
const wpCategory = require('./processes/wpCategory');

const templatesToProcess = [postsOnFront, pageOnFront, pageForPosts, wpPage, wpPost, wpCategory];

const initCretePages = async apiMethods => {
	const promises = templatesToProcess.map(templateProcess => templateProcess(apiMethods));

	await Promise.all(promises);
};

module.exports = {
	initCretePages
};
