import { PanelBody, ToggleControl, SelectControl } from '@wordpress/components';
import { compose } from '@wordpress/compose';
import { withSelect, withDispatch } from '@wordpress/data';
import { NAMESPACE } from '../../../config';
import { NAME as sidebarStoreName } from '../../../store/modules/sidebarsStore';
import { __ } from '@wordpress/i18n';
import { SIDEBARS_META } from '../../../../enums'

function OverrideSidebar(props) {
	const { value, setValue } = props;

	const options = [
		{ value: '', label: __('— Select —', 'project-paradise'), disabled: true },
		...props.sidebarList.map(sidebar => ({ value: sidebar.id, label: sidebar.name }))
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
		<PanelBody title={__('Override Default Sidebar', 'project-paradise')}>
			<ToggleControl label={__('Allow Overriding', 'project-paradise')} checked={value} onChange={onChange} />
			<SelectControl
				label={__('Select Sidebar', 'project-paradise')}
				value={value}
				options={options}
				onChange={onChange}
				disabled={!value}
			/>
		</PanelBody>
	);
}

const mapSelectToProps = withSelect(select => ({
	sidebarList: select(`${NAMESPACE}/${sidebarStoreName}`).getSidebarList(),
	value: select('core/editor').getEditedPostAttribute('meta')[SIDEBARS_META.SIDEBAR_OVERRIDE]
}));

const mapDispatchToProps = withDispatch(dispatch => ({
	setValue: newVal =>
		dispatch('core/editor').editPost({
			meta: { [SIDEBARS_META.SIDEBAR_OVERRIDE]: newVal }
		})
}));

export default compose(mapSelectToProps, mapDispatchToProps)(OverrideSidebar);
