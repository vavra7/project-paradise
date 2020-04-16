import { PanelBody, PanelRow } from '@wordpress/components';
import { withSelect } from '@wordpress/data';
import { compose } from '@wordpress/compose';
import { NAMESPACE } from '../../../config';
import { WP_ROUTES } from '../../../../enums';
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
				<div>
					{__('Widgets can be managed on', 'project-paradise')}{' '}
					<a href={`${siteUrl}${WP_ROUTES.WIDGETS}`}>{__('Widgets page', 'project-paradise')}</a>.
				</div>
			</PanelRow>
		</PanelBody>
	);
}

const mapSelectToProps = withSelect(select => {
	const sidebarOverride = select('core/editor').getEditedPostAttribute('meta')[META_NAME];
	// const defaultSidebars = select(`${NAMESPACE}/${sidebarStoreName}`).getDefaultSidebars();
	const sidebarId = sidebarOverride ? sidebarOverride : '';

	return {
		widgetList: select(`${NAMESPACE}/${sidebarStoreName}`).getWidgetList(sidebarId),
		siteUrl: select(`${NAMESPACE}/${settingsStoreName}`).getSiteUrl(),
		sidebarOverride
	};
});

export default compose(mapSelectToProps)(WidgetList);
