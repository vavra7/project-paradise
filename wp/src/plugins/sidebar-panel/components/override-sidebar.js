import { PanelBody, ToggleControl, SelectControl } from '@wordpress/components';
import { compose } from '@wordpress/compose';
import { withSelect, withDispatch } from '@wordpress/data';
import { namespace } from '../../../config';
import { NAME as sidebarStoreName } from '../../../store/sidebars';

const META_NAME = '_sidebar_override';

function OverrideSidebar(props) {
	const { value, setValue } = props;

	const options = [
		{ value: '', label: '-- Select --', disabled: true },
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
		<PanelBody title="Override Default Sidebar">
			<ToggleControl label="Allow Overriding" checked={value} onChange={onChange} />
			<SelectControl label="Select Sidebar" value={value} options={options} onChange={onChange} disabled={!value} />
		</PanelBody>
	);
}

const mapSelectToProps = withSelect(select => ({
	sidebarList: select(`${namespace}/${sidebarStoreName}`).getSidebarList(),
	value: select('core/editor').getEditedPostAttribute('meta')[META_NAME]
}));

const mapDispatchToProps = withDispatch(dispatch => ({
	setValue: newVal =>
		dispatch('core/editor').editPost({
			meta: { [META_NAME]: newVal }
		})
}));

export default compose(mapSelectToProps, mapDispatchToProps)(OverrideSidebar);
