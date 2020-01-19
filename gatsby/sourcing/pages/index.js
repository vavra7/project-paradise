const wpPostsOnFront = require('./processes/wpPostsOnFront');
const wpPageOnFront = require('./processes/wpPageOnFront');
const wpPageForPosts = require('./processes/wpPageForPosts');
const wpPage = require('./processes/wpPage');
const wpPost = require('./processes/wpPost');
const wpPostsOfCategory = require('./processes/wpPostsOfCategory');

const templatesToProcess = [wpPostsOnFront, wpPageOnFront, wpPageForPosts, wpPage, wpPost, wpPostsOfCategory];

const initCretePages = async apiMethods => {
	const promises = templatesToProcess.map(templateProcess => templateProcess(apiMethods));

	await Promise.all(promises);
};

module.exports = {
	initCretePages
};
