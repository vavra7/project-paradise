import { PluginSidebarMoreMenuItem, PluginSidebar } from '@wordpress/edit-post';
import OverrideSidebar from './components/override-sidebar';
import WidgetList from './components/widget-list';
import { __ } from '@wordpress/i18n';
import { isAvailable } from './availability';

const NAME = 'sidebar-panel';

const title = __('Sidebar', 'project-paradise');

const sidebarIcon = (
	<svg height="20" width="20" xmlns="http://www.w3.org/2000/svg">
		<path d="M 4.375 17.5 L 15.625 17.5 C 16.660156 17.5 17.5 16.660156 17.5 15.625 L 17.5 4.375 C 17.5 3.339844 16.660156 2.5 15.625 2.5 L 4.375 2.5 C 3.339844 2.5 2.5 3.339844 2.5 4.375 L 2.5 15.625 C 2.5 16.660156 3.339844 17.5 4.375 17.5 Z M 16.25 4.375 L 16.25 15.625 C 16.25 15.96875 15.96875 16.25 15.625 16.25 L 13.125 16.25 L 13.125 3.75 L 15.625 3.75 C 15.96875 3.75 16.25 4.03125 16.25 4.375 Z M 3.75 4.375 C 3.75 4.03125 4.03125 3.75 4.375 3.75 L 11.875 3.75 L 11.875 16.25 L 4.375 16.25 C 4.03125 16.25 3.75 15.96875 3.75 15.625 Z M 3.75 4.375 " />
	</svg>
);

const settings = {
	icon: sidebarIcon,
	render
};

export function render() {
	if (!isAvailable()) return null;

	return (
		<>
			<PluginSidebarMoreMenuItem target={NAME}>{title}</PluginSidebarMoreMenuItem>

			<PluginSidebar name={NAME} title={title}>
				<OverrideSidebar />
				<WidgetList />
			</PluginSidebar>
		</>
	);
}

export { NAME };
export default settings;
