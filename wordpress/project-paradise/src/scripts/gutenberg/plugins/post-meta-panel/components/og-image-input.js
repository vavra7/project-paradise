import { PanelBody, Button } from '@wordpress/components';
import { compose } from '@wordpress/compose';
import { withSelect, withDispatch } from '@wordpress/data';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

const META_NAME = '_og_image';

function TitleInput(props) {
	const { selectedMedia, setMetaValue } = props;

	const onSelect = media => {
		const { id: newVal } = media;

		setMetaValue(newVal);
	};

	const onRemove = () => {
		setMetaValue(null);
	};

	let content;

	if (selectedMedia) {
		const img = selectedMedia.media_details.sizes.medium
			? selectedMedia.media_details.sizes.medium
			: selectedMedia.media_details.sizes.full;

		content = (
			<>
				<MediaUploadCheck>
					<MediaUpload
						allowedTypes="image"
						multiple={false}
						onSelect={onSelect}
						value={selectedMedia.id}
						render={({ open }) => (
							<Button onClick={open} className="editor-post-featured-image__preview">
								<img src={img.source_url} />
							</Button>
						)}
					/>
				</MediaUploadCheck>

				<Button onClick={onRemove} isLink isDestructive>
					Remove image
				</Button>
			</>
		);
	} else {
		content = (
			<MediaUploadCheck>
				<MediaUpload
					allowedTypes="image"
					multiple={false}
					onSelect={onSelect}
					render={({ open }) => (
						<Button onClick={open} className="editor-post-featured-image__toggle">
							Media Library
						</Button>
					)}
				/>
			</MediaUploadCheck>
		);
	}

	return <PanelBody title={__('Open Graph Image', 'project-paradise')}>{content}</PanelBody>;
}

const mapSelectToProps = withSelect(select => {
	const editor = select('core/editor');
	const value = editor.getEditedPostAttribute('meta')[META_NAME];

	return {
		selectedMedia: value ? select('core').getMedia(value) : null
	};
});

const mapDispatchToProps = withDispatch(dispatch => ({
	setMetaValue: newVal =>
		dispatch('core/editor').editPost({
			meta: { [META_NAME]: newVal }
		})
}));

export default compose(mapSelectToProps, mapDispatchToProps)(TitleInput);
