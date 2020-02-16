import { PluginSidebarMoreMenuItem, PluginSidebar } from '@wordpress/edit-post';
import TitleInput from './components/title-input';
import OgTitleInput from './components/og-title-input';
import DescriptionInput from './components/description-input'
import OgDescriptionInput from './components/og-description-input'
import OgImageInput from './components/og-image-input'

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
				<DescriptionInput />
				<OgTitleInput />
				<OgDescriptionInput />
				<OgImageInput />
			</PluginSidebar>
		</>
	);
}

export { NAME };
export default settings;
