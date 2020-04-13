import { __ } from '@wordpress/i18n';
import MediaImgSelect from './MediaImgSelect';
import { SCREEN_IDS } from '../../enums';

const options = {
	title: __('Select Image', 'project-paradise'),
	multiple: false,
	library: {
		type: 'image'
	}
};

document.addEventListener('DOMContentLoaded', () => {
	if (window.wpData.screenId === SCREEN_IDS.BIO || window.wpData.screenId === SCREEN_IDS.BIO_EN) {
		new MediaImgSelect(options, {
			button: document.querySelector('button#image_us'),
			input: document.querySelector('input#image_us'),
			img: document.querySelector('img#image_us'),
			remove: document.querySelector('a#image_us')
		});

		new MediaImgSelect(options, {
			button: document.querySelector('button#image_t'),
			input: document.querySelector('input#image_t'),
			img: document.querySelector('img#image_t'),
			remove: document.querySelector('a#image_t')
		});

		new MediaImgSelect(options, {
			button: document.querySelector('button#image_k'),
			input: document.querySelector('input#image_k'),
			img: document.querySelector('img#image_k'),
			remove: document.querySelector('a#image_k')
		});
	}

	if (window.wpData.screenId === SCREEN_IDS.BIO_EN) {
		/**
		 * Set menu item active
		 */
		(() => {
			const menuItems = document.querySelector('#menu-appearance ul').children;
			let bioMenuItem;

			for (let i = 1; i < menuItems.length; i++) {
				let href = menuItems[i].querySelector('a').getAttribute('href');
				if (href.includes('page=bio')) {
					bioMenuItem = menuItems[i];

					break;
				}
			}

			if (bioMenuItem) {
				bioMenuItem.classList.add('current');
			}
		})();
	}
});
