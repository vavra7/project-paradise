import { registerBlockType } from '@wordpress/blocks';

registerBlockType('namespace/slug-test', {
	title: 'My test Block',
	description: 'Some description',
	icon: 'format-image',
	category: 'layout',
	attributes: {},
	edit: () => {
		return <div>Hello World!!</div>;
	},
	save: () => {}
});
