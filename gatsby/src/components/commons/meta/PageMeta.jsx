import React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';

function PageMeta(props) {
	const data = useStaticQuery(
		graphql`
			query {
				wpSettings {
					homeUrl
					siteTitle
					siteDescription
				}
			}
		`
	);
	const siteTitle = data.wpSettings.siteTitle;
	const siteDescription = data.wpSettings.siteDescription;
	const homeUrl = data.wpSettings.homeUrl;
	const defaultMeta = {
		title: siteTitle,
		description: siteDescription,
		url: homeUrl
	};
	const meta = {
		...defaultMeta,
		...props.meta
	};

	return (
		<Helmet title={meta.title} titleTemplate={`%s | ${siteTitle}`}>
			{meta.description && <meta name="description" content={meta.description} />}
			{meta.url && <meta name="og:url" content={meta.url} />}
			{meta.title && <meta name="og:title" content={meta.title} />}
			{meta.type && <meta name="og:type" content={meta.type} />}
		</Helmet>
	);
}

PageMeta.propTypes = {
	meta: PropTypes.object
};

PageMeta.defaultProps = {
	meta: {}
};

export default PageMeta;
