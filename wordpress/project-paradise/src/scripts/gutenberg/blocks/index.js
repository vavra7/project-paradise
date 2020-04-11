import { registerBlockType, unregisterBlockType } from '@wordpress/blocks';
import domReady from '@wordpress/dom-ready';
import { NAMESPACE } from '../config';
import gatsbyImage, { NAME as gatsbyImageName } from './gatsby-image/index';

const blocksToRegister = [[`${NAMESPACE}/${gatsbyImageName}`, gatsbyImage]];
const blocksToUnregister = ['core/image'];

/**
 * Register all custom blocks
 */
blocksToRegister.forEach(block => registerBlockType(...block));

/**
 * Unregister all blocks on black list
 */
window.onload = () => {
	domReady(() => {
		blocksToUnregister.forEach(block => unregisterBlockType(block));
	});
};
