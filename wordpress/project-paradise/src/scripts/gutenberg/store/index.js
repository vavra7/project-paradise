import { registerStore } from '@wordpress/data';
import { NAMESPACE } from '../config';

import sidebars, { NAME as sidebarsName } from './modules/sidebarsStore';
import settings, { NAME as settingsName } from './modules/settingsStore';
import bio, { NAME as bioName } from './modules/bioStore';

const storesToRegister = [
	[`${NAMESPACE}/${sidebarsName}`, sidebars],
	[`${NAMESPACE}/${settingsName}`, settings],
	[`${NAMESPACE}/${bioName}`, bio]
];

/**
 * Register stores
 */
storesToRegister.forEach(store => registerStore(...store));
