/**
 * Function generating pagination object
 */
const getPagination = (path, numOfPages) => {
	let _pagination = {};
	let _path;

	for (let i = 1; i <= numOfPages; i++) {
		if (i === 1) {
			_path = path;
		} else {
			_path = `${path === '/' ? '' : path}/page/${i}`;
		}

		_pagination[i] = _path;
	}

	return _pagination;
};

module.exports = {
	getPagination
};
