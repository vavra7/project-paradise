import { select } from '@wordpress/data';
import { POST_TYPES } from '../../../enums';

const availableOn = [POST_TYPES.POST, POST_TYPES.POST_EN];

export function isAvailable() {
	const postType = select('core/editor').getCurrentPostType();

	return availableOn.includes(postType);
}
