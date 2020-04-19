import { PluginSidebarMoreMenuItem, PluginSidebar } from '@wordpress/edit-post';
import icon from './icon';
import ActiveSidebar from './components/active-sidebar';
import OverrideSidebar from './components/override-sidebar';
import OverrideBioWidget from './components/override-bio-widget';
import WidgetList from './components/widget-list';
import { __ } from '@wordpress/i18n';
import { isAvailable } from './availability';

const NAME = 'sidebar-panel';

const title = __('Sidebar', 'project-paradise');

const settings = {
	icon,
	render
};

export function render() {
	if (!isAvailable()) return null;

	return (
		<>
			<PluginSidebarMoreMenuItem target={NAME}>{title}</PluginSidebarMoreMenuItem>

			<PluginSidebar name={NAME} title={title}>
				<ActiveSidebar />
				<OverrideSidebar />
				<OverrideBioWidget />
				<WidgetList />
			</PluginSidebar>
		</>
	);
}

export { NAME };
export default settings;
