const axios = require('axios');

/**
 *  General function for requests from api
 */
const requestFromApi = ({ reporter }, api) => {
	return api
		.handler(api.config)
		.then(res => {
			reporter.success(`request data from api ${api.id}`);

			return api.reduce(res);
		})
		.catch(() => {
			reporter.error(`request data from api ${api.id}`);
		});
};

/**
 *  Basic handler function
 */
const request = config => {
	return axios(config);
};

/**
 *  Specific handler function for fetching data from paged WP endpoint
 */
const requestPagedWpData = async config => {
	const PER_PAGE = 50; // WP supports max 100
	const url = config.url;
	const data = [];

	config.url = `${url}?per_page=${PER_PAGE}&page=1`;
	const firstRes = await axios(config);
	const totalPages = firstRes.headers['x-wp-totalpages'];
	data.push(...firstRes.data);

	if (totalPages > 1) {
		for (let i = 2; i <= totalPages; i++) {
			config.url = `${url}?per_page=${PER_PAGE}&page=${i}`;
			const res = await axios(config);
			data.push(...res.data);
		}
	}

	return data;
};

module.exports = {
	requestFromApi,
	request,
	requestPagedWpData
};
