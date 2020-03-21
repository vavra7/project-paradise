import { registerStore } from '@wordpress/data';
import { namespace } from '../config';

import sidebars, { NAME as sidebarsName } from './sidebars';
import settings, { NAME as settingsName } from './settings';

const storesToRegister = [
	[`${namespace}/${sidebarsName}`, sidebars],
	[`${namespace}/${settingsName}`, settings]
];

/**
 * Register stores
 */
storesToRegister.forEach(store => registerStore(...store));
