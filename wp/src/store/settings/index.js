import apiFetch from '@wordpress/api-fetch';

const NAME = 'settings';

function reducer(state = { settings: [] }, action) {
	switch (action.type) {
		case 'SET_SETTINGS_DATA':
			return {
				...state,
				settings: action.settings
			};
		default:
			return state;
	}
}

const actions = {
	setSettingsData(settings) {
		return {
			type: 'SET_SETTINGS_DATA',
			settings
		};
	},
	fetchSettingsData(path) {
		return {
			type: 'FETCH_SETTINGS_DATA',
			path
		};
	}
};

const selectors = {
	getSiteUrl(state) {
		return state.settings.url;
	}
};

const controls = {
	FETCH_SETTINGS_DATA(action) {
		return apiFetch({ path: action.path });
	}
};

const resolvers = {
	*getSiteUrl() {
		const data = yield actions.fetchSettingsData('/wp/v2/settings/');

		return actions.setSettingsData(data);
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
