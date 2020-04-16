import { POST_TYPES, SIDEBAR_LOCATION_SLUGS } from '../../../enums';

export function getActiveSidebar(props) {
	const { postType, sidebarOverride, defaultSidebars, sidebarList } = props;

	const findSidebarId = slug => {
		const item = defaultSidebars.find(sidebar => sidebar.location_slug === slug);
		return item ? item.sidebar : '';
	};

	const findSidebar = id => sidebarList.find(sidebar => sidebar.id === id);

	let sidebar = {};

	if (sidebarOverride) {
		sidebar = sidebar = findSidebar(sidebarOverride);
	} else {
		switch (postType) {
			case POST_TYPES.POST:
				sidebar = findSidebar(findSidebarId(SIDEBAR_LOCATION_SLUGS.POSTS));
				break;

			case POST_TYPES.POST_EN:
				sidebar = findSidebar(findSidebarId(SIDEBAR_LOCATION_SLUGS.POSTS_EN));
				break;

			default:
				break;
		}
	}

	return sidebar;
}
