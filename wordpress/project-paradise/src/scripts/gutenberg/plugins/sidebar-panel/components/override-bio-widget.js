import { PanelBody, ToggleControl, SelectControl } from '@wordpress/components';
import { compose } from '@wordpress/compose';
import { withSelect, withDispatch } from '@wordpress/data';
import { NAMESPACE } from '../../../config';
import { NAME as bioStoreName } from '../../../store/modules/bioStore';
import { __ } from '@wordpress/i18n';
import { SIDEBARS_META } from '../../../../enums';

function OverrideBioWidget(props) {
	const { value, setValue } = props;

	const options = [
		{ value: '', label: __('— Select —', 'project-paradise'), disabled: true },
		...props.bioList.map(bio => ({ value: bio.id, label: bio.label }))
	];

	const onChange = newVal => {
		if (newVal === false) {
			setValue('');
		} else if (newVal === true) {
			setValue(options[1].value);
		} else {
			setValue(newVal);
		}
	};

	return (
		<PanelBody title={__('Override Default Bio Widget', 'project-paradise')}>
			<ToggleControl label={__('Allow Overriding', 'project-paradise')} checked={value} onChange={onChange} />
			<SelectControl
				label={__('Select Bio', 'project-paradise')}
				value={value}
				options={options}
				onChange={onChange}
				disabled={!value}
			/>
		</PanelBody>
	);
}

const mapSelectToProps = withSelect(select => ({
	bioList: select(`${NAMESPACE}/${bioStoreName}`).getBio(),
	value: select('core/editor').getEditedPostAttribute('meta')[SIDEBARS_META.BIO_WIDGET_OVERRIDE]
}));

const mapDispatchToProps = withDispatch(dispatch => ({
	setValue: newVal =>
		dispatch('core/editor').editPost({
			meta: { [SIDEBARS_META.BIO_WIDGET_OVERRIDE]: newVal }
		})
}));

export default compose(mapSelectToProps, mapDispatchToProps)(OverrideBioWidget);
