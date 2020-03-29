import { graphql } from 'gatsby';

export const query = graphql`
	fragment wpPageForPostsMeta on wpPage {
		title
		link
		excerpt
		postMeta {
			title
			description
			ogTitle
			ogDescription
			ogImage
		}
	}
`;

export function getWpPageForPostsMeta(wpPage) {
	const title = wpPage.postMeta.title ? wpPage.postMeta.title : wpPage.title;
	const description = wpPage.postMeta.description ? wpPage.postMeta.description : wpPage.excerpt;
	const ogTitle = wpPage.postMeta.ogTitle ? wpPage.postMeta.ogTitle : title;
	const ogDescription = wpPage.postMeta.ogDescription ? wpPage.postMeta.ogDescription : description;
	const ogImage = wpPage.postMeta.ogImage ? wpPage.postMeta.ogImage : '';
	const link = wpPage.link;

	return {
		title,
		description,
		ogTitle,
		ogDescription,
		ogImage,
		link
	};
}
