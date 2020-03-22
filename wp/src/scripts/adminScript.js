const SCREEN_IDS = {
	BIO: 'appearance_page_bio'
};

class MediaImgSelect {
	constructor(options, selectors) {
		this.frame = wp.media(options);
		this.selectors = selectors;

		this.openFrame = this.openFrame.bind(this);
		this.onOpen = this.onOpen.bind(this);
		this.onSelect = this.onSelect.bind(this);
		this.onRemove = this.onRemove.bind(this);

		this.defineActions();
	}

	/**
	 * Defines all actions
	 */
	defineActions() {
		const { button, img, remove } = this.selectors;

		button.addEventListener('click', this.openFrame);
		img.addEventListener('click', this.openFrame);
		remove.addEventListener('click', this.onRemove);

		this.frame.on('open', this.onOpen);
		this.frame.on('select', this.onSelect);
	}

	/**
	 * Open window with media frame
	 */
	openFrame(e) {
		e.preventDefault();
		this.frame.open();
	}

	/**
	 * Action on open window
	 */
	onOpen() {
		const { input } = this.selectors;

		const value = input.getAttribute('value');
		const media = wp.media.attachment(value);
		const selection = this.frame.state().get('selection');

		if (media) {
			selection.push(media);
		}
	}

	/**
	 * Action on select an image
	 */
	onSelect() {
		const { input, img } = this.selectors;

		const selection = this.frame
			.state()
			.get('selection')
			.first();

		input.setAttribute('value', selection.id);
		img.setAttribute('src', selection.attributes.sizes.thumbnail.url);
	}

	/**
	 * Action on click on remove link
	 */
	onRemove(e) {
		e.preventDefault();

		const { input, img } = this.selectors;

		input.setAttribute('value', '');
		img.setAttribute('src', window.wpData.assets.avatar.url);
	}
}

const options = {
	title: 'Select Image',
	multiple: false,
	library: {
		type: 'image'
	}
};

document.addEventListener('DOMContentLoaded', () => {
	if (window.wpData.screenId === SCREEN_IDS.BIO) {
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
});
