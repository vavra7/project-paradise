const api = require('./api');
const { CACHE_KEYS } = require('./enums');
const { requestFromApi } = require('./api/utils');

module.exports.generateToken = async apiMethods => {
	const data = await requestFromApi(apiMethods, api.wp.generateToken());
	await apiMethods.cache.set(CACHE_KEYS.WP_AUTH_TOKEN, data);
};
