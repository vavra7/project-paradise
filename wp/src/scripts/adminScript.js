class MediaFrame {
	constructor(options, selectors) {
		this.frame = wp.media(options);
		this.selectors = selectors;
		this.onSelect = this.onSelect.bind(this);
		this.onOpen = this.onOpen.bind(this);
		this.frame.on('open', this.onOpen);
		this.frame.on('select', this.onSelect);
		this.initListeners();
	}

	initListeners() {
		const { button } = this.selectors;

		button.addEventListener('click', e => {
			e.preventDefault();
			this.frame.open();
		});
	}

	onOpen() {
		const { input } = this.selectors;

		const value = input.getAttribute('value');
		const media = wp.media.attachment(value);
		const selection = this.frame.state().get('selection');

		if (media) {
			selection.push(media);
		}
	}

	onSelect() {
		const { input, img } = this.selectors;
		const selection = this.frame
			.state()
			.get('selection')
			.first();

		input.setAttribute('value', selection.id);
		img.setAttribute('src', selection.attributes.sizes.thumbnail.url);
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
	new MediaFrame(options, {
		button: document.querySelector('button#image_us'),
		input: document.querySelector('input#image_us'),
		img: document.querySelector('img#image_us')
	});

	new MediaFrame(options, {
		button: document.querySelector('button#image_t'),
		input: document.querySelector('input#image_t'),
		img: document.querySelector('img#image_t')
	});

	new MediaFrame(options, {
		button: document.querySelector('button#image_k'),
		input: document.querySelector('input#image_k'),
		img: document.querySelector('img#image_k')
	});
});
