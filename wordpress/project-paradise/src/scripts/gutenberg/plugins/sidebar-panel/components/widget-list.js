import { PanelBody, PanelRow } from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';
import { withSelect } from '@wordpress/data';
import { compose } from '@wordpress/compose';
import { NAMESPACE } from '../../../config';
import { getActiveSidebar } from '../sidebarsRouter';
import { WP_ROUTES, SIDEBARS_META } from '../../../../enums';
import { NAME as sidebarStoreName } from '../../../store/modules/sidebarsStore';
import { NAME as settingsStoreName } from '../../../store/modules/settingsStore';
import { __ } from '@wordpress/i18n';

function WidgetList(props) {
	const { siteUrl } = props;
	const [activeSidebar, setActiveSidebar] = useState(
		getActiveSidebar({
			...props
		})
	);
	const widgetList = activeSidebar && activeSidebar.widgets ? activeSidebar.widgets : [];

	useEffect(() => {
		setActiveSidebar(
			getActiveSidebar({
				...props
			})
		);
	}, [props]);

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

const mapSelectToProps = withSelect(select => ({
	postType: select('core/editor').getCurrentPostType(),
	sidebarOverride: select('core/editor').getEditedPostAttribute('meta')[SIDEBARS_META.SIDEBAR_OVERRIDE],
	defaultSidebars: select(`${NAMESPACE}/${sidebarStoreName}`).getDefaultSidebars(),
	sidebarList: select(`${NAMESPACE}/${sidebarStoreName}`).getSidebarList(),
	siteUrl: select(`${NAMESPACE}/${settingsStoreName}`).getSiteUrl()
}));

export default compose(mapSelectToProps)(WidgetList);
