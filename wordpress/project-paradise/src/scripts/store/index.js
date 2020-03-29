import { registerStore } from '@wordpress/data';
import { NAMESPACE } from '../config';

import sidebars, { NAME as sidebarsName } from './sidebars';
import settings, { NAME as settingsName } from './settings';

const storesToRegister = [
	[`${NAMESPACE}/${sidebarsName}`, sidebars],
	[`${NAMESPACE}/${settingsName}`, settings]
];

/**
 * Register stores
 */
storesToRegister.forEach(store => registerStore(...store));
