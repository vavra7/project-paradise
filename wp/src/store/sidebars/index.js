import apiFetch from '@wordpress/api-fetch';

const NAME = 'sidebars';

function reducer(state = { sidebars: [] }, action) {
	switch (action.type) {
		case 'SET_SIDEBARS_DATA':
			return {
				...state,
				sidebars: action.sidebars
			};
		default:
			return state;
	}
}

const actions = {
	setSidebarsData(sidebars) {
		return {
			type: 'SET_SIDEBARS_DATA',
			sidebars
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
		const { sidebars } = state;
		const sidebarsList = sidebars.map(sidebar => ({
			id: sidebar.id,
			name: sidebar.name,
			description: sidebar.description
		}));

		return sidebarsList;
	},
	getWidgetList(state, sidebarId) {
		const { sidebars } = state;
		let getWidgetList = [];
		const sidebar = sidebars.find(sidebar => sidebar.id === sidebarId);

		if (sidebar && sidebar.widgets && sidebar.widgets.length) {
			getWidgetList = sidebar.widgets;
		}

		return getWidgetList;
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
