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

		const selection = this.frame.state().get('selection').first();

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

export default MediaImgSelect;
