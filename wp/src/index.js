import domReady from '@wordpress/dom-ready';
import { addFilter } from '@wordpress/hooks';
import { registerBlockType, unregisterBlockType } from '@wordpress/blocks';
import gatsbyImage from './blocks/gatsby-image';

const blocksDisableAlignment = ['core/cover', 'core/gallery'];
const blocksRegister = [['gatsby/image', gatsbyImage]];
const blocksBlackList = ['core/image'];

/**
 * Disable alignment for selected blocks. Core block needs to have defined
 * alignment in "settings" object under key "supports"
 */
function disableAlignment(settings, name) {
	if (!blocksDisableAlignment.includes(name)) {
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
blocksRegister.forEach(block => registerBlockType(...block));

/**
 * Unregister all blocks on black list
 */
window.onload = () => {
	domReady(() => {
		blocksBlackList.forEach(block => unregisterBlockType(block));
	});
};
