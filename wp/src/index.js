import './store';
import './blocks';
import './plugins';

import { addFilter } from '@wordpress/hooks';

const blocksToDisableAlignment = ['core/cover', 'core/gallery'];

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
