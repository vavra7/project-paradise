import { PanelBody, TextareaControl } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { withSelect, withDispatch } from '@wordpress/data';

const META_NAME = '_og_description';

function TitleInput(props) {
	const { value, setValue } = props;
	const [count, setCount] = useState(value ? value.length : 0);

	const onChange = newVal => {
		setValue(newVal);
		setCount(newVal.length);
	};

	return (
		<PanelBody title="Open Graph Description">
			<TextareaControl
				label="Write an og:description"
				value={value}
				help={`${count} / 260`}
				onChange={onChange}
			></TextareaControl>
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
