import { registerPlugin } from '@wordpress/plugins';
import postMetaPanel, { NAME as postMetaPanelName } from './post-meta-panel';
import sidebarPanel, { NAME as sidebarPanelName } from './sidebar-panel/index';

const pluginsToRegister = [
	[`${postMetaPanelName}`, postMetaPanel],
	[`${sidebarPanelName}`, sidebarPanel]
];

/**
 * Register all plugins
 */
pluginsToRegister.forEach(plugin => registerPlugin(...plugin));
