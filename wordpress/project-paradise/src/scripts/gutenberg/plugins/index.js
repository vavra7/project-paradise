import { registerPlugin } from '@wordpress/plugins';
import postMetaPanel, { NAME as postMetaPanelName } from './post-meta-panel';
import sidebarPanel, { NAME as sidebarPanelName } from './sidebar-panel';
import translationLinks, { NAME as translationLinksName } from './translation-links';

const pluginsToRegister = [
	[`${postMetaPanelName}`, postMetaPanel],
	[`${sidebarPanelName}`, sidebarPanel],
	[`${translationLinksName}`, translationLinks]
];

/**
 * Register all plugins
 */
pluginsToRegister.forEach(plugin => registerPlugin(...plugin));
