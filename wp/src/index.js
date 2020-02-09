import domReady from '@wordpress/dom-ready';
import { addFilter } from '@wordpress/hooks';
import { registerBlockType, unregisterBlockType } from '@wordpress/blocks';
import { registerPlugin } from '@wordpress/plugins';

import gatsbyImage from './blocks/gatsby-image';
import postMetaPanel, { NAME as postMetaPanelName } from './plugins/post-meta-panel';

const blocksToDisableAlignment = ['core/cover', 'core/gallery'];
const blocksToRegister = [['gatsby/image', gatsbyImage]];
const pluginsToRegister = [[postMetaPanelName, postMetaPanel]];
const blocksToBlackList = ['core/image'];

/**
 * Disable alignment for selected blocks. Core block needs to have defined
 * alignment in "settings" object under key "supports"
 */
function disableAlignment(settings, name) {
	if (!blocksToDisableAlignment.includes(name)) {
		return settings;
	}

	const newSettings = {
		...settings,
		...{
			supports: {
				align: false
			}
		}
	};

	return newSettings;
}
addFilter('blocks.registerBlockType', 'project-paradise/disable-alignment', disableAlignment);

/**
 * Register all custom blocks
 */
blocksToRegister.forEach(block => registerBlockType(...block));

/**
 * Register all custom plugins
 */
pluginsToRegister.forEach(plugin => registerPlugin(...plugin));

/**
 * Unregister all blocks on black list
 */
window.onload = () => {
	domReady(() => {
		blocksToBlackList.forEach(block => unregisterBlockType(block));
	});
};
