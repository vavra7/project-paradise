import apiFetch from '@wordpress/api-fetch';

const NAME = 'sidebars';

function reducer(state = { sidebarList: [], defaultSidebars: [] }, action) {
	switch (action.type) {
		case 'SET_SIDEBARS_DATA':
			return {
				...state,
				defaultSidebars: action.payload.default_sidebars,
				sidebarList: action.payload.sidebar_list
			};
		default:
			return state;
	}
}

const actions = {
	setSidebarsData(data) {
		return {
			type: 'SET_SIDEBARS_DATA',
			payload: data
		};
	},
	fetchSidebarData(path) {
		return {
			type: 'FETCH_SIDEBARS_DATA',
			path
		};
	}
};

const selectors = {
	getSidebarList(state) {
		const sidebarList = state.sidebarList.map(sidebar => ({
			id: sidebar.id,
			name: sidebar.name,
			description: sidebar.description
		}));

		return sidebarList;
	},
	getWidgetList(state, sidebarId) {
		let getWidgetList = [];
		const sidebar = state.sidebarList.find(sidebar => sidebar.id === sidebarId);

		if (sidebar && sidebar.widgets && sidebar.widgets.length) {
			getWidgetList = sidebar.widgets;
		}

		return getWidgetList;
	},
	getDefaultSidebars(state) {
		const { defaultSidebars } = state;

		return defaultSidebars;
	}
};

const controls = {
	FETCH_SIDEBARS_DATA(action) {
		return apiFetch({ path: action.path });
	}
};

const resolvers = {
	*getSidebarList() {
		const data = yield actions.fetchSidebarData('/project-paradise/v1/sidebars/');

		return actions.setSidebarsData(data);
	},
	*getWidgetList() {
		const data = yield actions.fetchSidebarData('/project-paradise/v1/sidebars/');

		return actions.setSidebarsData(data);
	},
	*getDefaultSidebars() {
		const data = yield actions.fetchSidebarData('/project-paradise/v1/sidebars/');

		return actions.setSidebarsData(data);
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
