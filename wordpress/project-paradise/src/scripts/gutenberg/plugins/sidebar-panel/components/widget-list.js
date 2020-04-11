import { PanelBody, PanelRow } from '@wordpress/components';
import { withSelect } from '@wordpress/data';
import { compose } from '@wordpress/compose';
import { NAMESPACE } from '../../../config';
import { NAME as sidebarStoreName } from '../../../store/sidebars';
import { NAME as settingsStoreName } from '../../../store/settings';
import { __ } from '@wordpress/i18n';


const META_NAME = '_sidebar_override';

function WidgetList(props) {
	const { widgetList, siteUrl } = props;

	return (
		<PanelBody title={__('Widget List', 'project-paradise')}>
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
	const defaultSidebar = select(`${NAMESPACE}/${sidebarStoreName}`).getDefaultSidebar('post');
	const sidebarId = sidebarOverride ? sidebarOverride : defaultSidebar;

	return {
		widgetList: select(`${NAMESPACE}/${sidebarStoreName}`).getWidgetList(sidebarId),
		siteUrl: select(`${NAMESPACE}/${settingsStoreName}`).getSiteUrl(),
		sidebarOverride
	};
});

export default compose(mapSelectToProps)(WidgetList);
