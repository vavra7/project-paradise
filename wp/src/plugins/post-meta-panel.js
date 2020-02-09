import { PluginSidebarMoreMenuItem, PluginSidebar } from '@wordpress/edit-post';
import TitleInput from './components/title-input'

const NAME = 'post-meta';
const TITLE = 'Post Meta';

const settings = {
	icon: 'share',
	render
};

export function render() {
	return (
		<>
			<PluginSidebarMoreMenuItem target={NAME}>{TITLE}</PluginSidebarMoreMenuItem>

			<PluginSidebar name={NAME} title={TITLE} className="post-meta-panel">
				<TitleInput />
			</PluginSidebar>
		</>
	);
}

export { NAME };
export default settings;
