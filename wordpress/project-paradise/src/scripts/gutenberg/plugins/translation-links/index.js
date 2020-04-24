import { PluginDocumentSettingPanel } from '@wordpress/edit-post';
import { __ } from '@wordpress/i18n';
import AutocompleteLink from './components/autocomplete-link';

const NAME = 'translation-links';

const title = __('Translation Links', 'project-paradise');

const settings = {
	icon: null,
	render
};

export function render() {
	return (
		<PluginDocumentSettingPanel name={NAME} title={title}>
			<AutocompleteLink />
		</PluginDocumentSettingPanel>
	);
}

export { NAME };
export default settings;
