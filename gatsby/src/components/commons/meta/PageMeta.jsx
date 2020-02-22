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
	
	const generalMeta = {
		title: siteTitle,
		description: siteDescription,
		url: homeUrl
	};
	const reducedPropsMeta = (propsMeta => {
		Object.keys(propsMeta).forEach(key => !propsMeta[key] && delete propsMeta[key]);
		return propsMeta;
	})(props.meta);
	const mergedMeta = {
		...generalMeta,
		...reducedPropsMeta
	};
	const meta = (mergedMeta => {
		let _meta = { ...mergedMeta };

		if (!mergedMeta.ogTitle && mergedMeta.title) _meta.ogTitle = mergedMeta.title;
		if (!mergedMeta.ogDescription && mergedMeta.description) _meta.ogDescription = mergedMeta.description;

		return _meta;
	})(mergedMeta);

	return (
		<Helmet title={meta.title} titleTemplate={`%s | ${siteTitle}`}>
			{meta.description && <meta name="description" content={meta.description} />}
			{meta.ogTitle && <meta name="og:title" content={meta.ogTitle} />}
			{meta.ogDescription && <meta name="og:description" content={meta.ogDescription} />}
			{meta.ogImage && <meta name="og:image" content={meta.ogImage} />}
			{meta.type && <meta name="og:type" content={meta.type} />}
			{meta.url && <meta name="og:url" content={meta.url} />}
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
