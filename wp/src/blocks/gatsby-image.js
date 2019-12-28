import { Button } from '@wordpress/components';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';

const TITLE = 'Image';

const settings = {
	title: TITLE,
	description: 'Image block for use with Gatsby.',
	icon: 'format-image',
	keywords: ['image', 'photo', 'picture'],
	category: 'common',
	attributes: {
		id: {
			type: 'string'
		},
		imgPrevUrl: {
			type: 'string',
			source: 'attribute',
			selector: 'img',
			attribute: 'src'
		},
		alt: {
			type: 'string',
			source: 'attribute',
			selector: 'img',
			attribute: 'alt'
		}
	},
	edit,
	save
};

export function edit({ attributes, setAttributes }) {
	// TODO: vyřešit ověření že příloha existuje. Aktuálně se nechová správně pokud v mediích obrázek smažu. Mizí id pokud se reloadne a znovu uloží.
	const onSelect = media => {
		const imgPrevUrl = media.sizes.large ? media.sizes.large.url : media.sizes.full.url;

		setAttributes({ id: media.id, imgPrevUrl, alt: media.alt });
	};

	const mediaLibraryBtn = props => {
		return (
			<MediaUploadCheck>
				<MediaUpload
					allowedTypes="image"
					multiple={false}
					value={attributes.id}
					onSelect={onSelect}
					render={({ open }) => (
						<Button onClick={open} isTertiary isLarge={props.isLarge}>
							Media Library
						</Button>
					)}
				/>
			</MediaUploadCheck>
		);
	};

	const label = (
		<div className="d-flex ai-center jc-center components-placeholder__label">
			<span className="dashicons dashicons-format-image mr-2"></span>
			{TITLE}
		</div>
	);

	return (
		<div className="wp-block-gatsby-image">
			{!attributes.imgPrevUrl ? (
				<div className="pa-5 bg-wp-light-grey">
					{label}

					<div className="components-placeholder__instructions text-center">Use media library to pick an image.</div>

					<div className="d-flex jc-center">{mediaLibraryBtn({ isLarge: true })}</div>
				</div>
			) : (
				<div className="img-wrapper p-relative text-center">
					<img src={attributes.imgPrevUrl} />

					<div className="img-overlay p-absolute d-flex fd-column jc-center ai-center">
						{label}

						<div className="components-placeholder__instructions text-center mt-2">
							Use media library to change image.
						</div>

						{mediaLibraryBtn({ isLarge: false })}
					</div>
				</div>
			)}
		</div>
	);
}

export function save({ className, attributes }) {
	return <img className={className} src={attributes.imgPrevUrl} alt={attributes.alt} />;
}

export default settings;
