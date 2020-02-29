import { PanelBody, PanelRow } from '@wordpress/components';
import { compose } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';
import { namespace } from '../../../config'
import { NAME as sidebarStoreName } from '../../../store/sidebars';

function OverrideSidebar(props) {
	return (
		<PanelBody title="asdfa">
			<PanelRow>
				{/* <label>lasfjlů</label> */}
				<pre>{JSON.stringify(props.sidebarList, null, 2)}</pre>
			</PanelRow>
		</PanelBody>
	);
}

const mapSelectToProps = withSelect(select => ({
	sidebarList: select(`${namespace}/${sidebarStoreName}`).getSidebarList()
}));

export default compose(mapSelectToProps)(OverrideSidebar);
