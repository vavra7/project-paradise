import domReady from '@wordpress/dom-ready';
import { registerBlockType, unregisterBlockType } from '@wordpress/blocks';
import gatsbyImage from './blocks/gatsby-image';

const blocksToRegister = [['gatsby/image', gatsbyImage]];
const blocksBlackList = ['core/image'];

/**
 * Register all custom blocks
 */
blocksToRegister.forEach(block => registerBlockType(...block));

/**
 * Unregister all blocks on black list
 */
window.onload = () => {
	domReady(() => {
		blocksBlackList.forEach(block => unregisterBlockType(block));
	});
};
