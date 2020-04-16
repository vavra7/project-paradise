import { PanelBody } from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';
import { SIDEBARS_META, WP_ROUTES } from '../../../../enums';
import { NAMESPACE } from '../../../config';
import { NAME as sidebarStoreName } from '../../../store/sidebars';
import { NAME as settingsStoreName } from '../../../store/settings';
import { getActiveSidebar } from '../sidebarsRouter';
import { __ } from '@wordpress/i18n';
import icon from '../icon';

function ActiveSidebar(props) {
	const { siteUrl } = props;
	const [activeSidebar, setActiveSidebar] = useState(
		getActiveSidebar({
			...props
		})
	);

	useEffect(() => {
		setActiveSidebar(
			getActiveSidebar({
				...props
			})
		);
	}, [props]);

	let description;
	if (activeSidebar) {
		description = activeSidebar && activeSidebar.description ? activeSidebar.description : '';
	} else {
		description = (
			<div>
				{__('Assign default sidebar on', 'project-paradise')}{' '}
				<a href={`${siteUrl}${WP_ROUTES.SIDEBARS}`}>{__('Sidebars page', 'project-paradise')}</a>.
			</div>
		);
	}

	return (
		<PanelBody>
			<div className="block-editor-block-card">
				<span className="block-editor-block-icon has-colors">{icon}</span>

				<div className="block-editor-block-card__content">
					<div className="block-editor-block-card__title">
						{activeSidebar && activeSidebar.name ? activeSidebar.name : __('-', 'project-paradise')}
					</div>

					<div className="block-editor-block-card__description">{description}</div>
				</div>
			</div>
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

export default compose(mapSelectToProps)(ActiveSidebar);
