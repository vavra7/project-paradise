import apiFetch from '@wordpress/api-fetch';

const NAME = 'bio';

function reducer(state = { bio: [] }, action) {
	switch (action.type) {
		case 'SET_BIO':
			return {
				...state,
				bio: action.bio
			};

		default:
			return state;
	}
}

const actions = {
	setBio(bio) {
		return {
			type: 'SET_BIO',
			bio
		};
	},
	fetchBio(path) {
		return {
			type: 'FETCH_BIO_DATA',
			path
		};
	}
};

const selectors = {
	getBio(state) {
		return state.bio;
	}
};

const controls = {
	FETCH_BIO_DATA(action) {
		return apiFetch({ path: action.path });
	}
};

const resolvers = {
	*getBio() {
		const data = yield actions.fetchBio('/project-paradise/v1/bio/');

		return actions.setBio(data);
	}
};

const settings = {
	reducer,
	actions,
	selectors,
	controls,
	resolvers
};

export { NAME };
export default settings;
