import { PanelBody, PanelRow } from '@wordpress/components';
import { withSelect } from '@wordpress/data';
import { compose } from '@wordpress/compose';
import { namespace } from '../../../config';
import { NAME as sidebarStoreName } from '../../../store/sidebars';
import { NAME as settingsStoreName } from '../../../store/settings';

const META_NAME = '_sidebar_override';

function WidgetList(props) {
	const { widgetList, siteUrl } = props;

	return (
		<PanelBody title="Widget List">
			{widgetList.map(widget => (
				<PanelRow>{widget.name}</PanelRow>
			))}

			<PanelRow>
				Widgets can be managed on <a href={`${siteUrl}/wp-admin/widgets.php`}>widgets page</a>.
			</PanelRow>
		</PanelBody>
	);
}

const mapSelectToProps = withSelect(select => {
	const sidebarOverride = select('core/editor').getEditedPostAttribute('meta')[META_NAME];
	const defaultSidebar = select(`${namespace}/${sidebarStoreName}`).getDefaultSidebar('post');
	const sidebarId = sidebarOverride ? sidebarOverride : defaultSidebar;

	return {
		widgetList: select(`${namespace}/${sidebarStoreName}`).getWidgetList(sidebarId),
		siteUrl: select(`${namespace}/${settingsStoreName}`).getSiteUrl(),
		sidebarOverride
	};
});

export default compose(mapSelectToProps)(WidgetList);
