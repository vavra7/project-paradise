import { PanelBody, TextControl } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { withSelect, withDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

const META_NAME = '_og_title';

function TitleInput(props) {
	const { value, setValue } = props;
	const [count, setCount] = useState(value ? value.length : 0);

	const onChange = newVal => {
		setValue(newVal);
		setCount(newVal.length);
	};

	return (
		<PanelBody title={__('Open Graph Title', 'project-paradise')}>
			<TextControl label="Write an og:title" value={value} help={`${count} / 50`} onChange={onChange}></TextControl>
		</PanelBody>
	);
}

const mapSelectToProps = withSelect(select => ({
	value: select('core/editor').getEditedPostAttribute('meta')[META_NAME]
}));

const mapDispatchToProps = withDispatch(dispatch => ({
	setValue: newVal =>
		dispatch('core/editor').editPost({
			meta: { [META_NAME]: newVal }
		})
}));

export default compose(mapSelectToProps, mapDispatchToProps)(TitleInput);
