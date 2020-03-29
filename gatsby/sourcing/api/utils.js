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
		.catch(e => {
			reporter.error(
				`request data from api ${api.id}${
					e && e.response && e.response.data ? '\n\ndata: ' + JSON.stringify(e.response.data, null, 2) : ''
				}`
			);
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
	const url = new URL(config.url);
	const data = [];

	let _url = url;
	_url.searchParams.append('per_page', PER_PAGE);
	_url.searchParams.append('page', 1);

	config.url = _url.href;
	const firstRes = await axios(config);
	const totalPages = firstRes.headers['x-wp-totalpages'];
	data.push(...firstRes.data);

	if (totalPages > 1) {
		for (let i = 2; i <= totalPages; i++) {
			_url = url;
			_url.searchParams.append('per_page', PER_PAGE);
			_url.searchParams.append('page', i);

			config.url = _url.href;
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
