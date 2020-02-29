import { registerStore } from '@wordpress/data';
import { namespace } from '../config';
import sidebars, { NAME as sidebarsName } from './sidebars';

const storesToRegister = [[`${namespace}/${sidebarsName}`, sidebars]];

/**
 * Register stores
 */
storesToRegister.forEach(store => registerStore(...store));
