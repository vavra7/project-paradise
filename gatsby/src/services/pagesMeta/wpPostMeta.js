import { graphql } from 'gatsby';

export const query = graphql`
	fragment wpPostMeta on wpPost {
		title
		excerpt
		link
		featuredMedia {
			childWpMedia {
				mediaDetails {
					sizes {
						mediumLarge {
							sourceUrl
						}
						full {
							sourceUrl
						}
					}
				}
			}
		}
		postMeta {
			title
			description
			ogTitle
			ogDescription
			ogImage
		}
	}
`;

export function getWpPostMeta(wpPost) {
	const featuredImgSrc = (() => {
		let src = '';
		if (wpPost.featuredMedia.childWpMedia) {
			const sizes = wpPost.featuredMedia.childWpMedia.mediaDetails.sizes;
			src = sizes.mediumLarge ? sizes.mediumLarge.sourceUrl : sizes.full.sourceUrl;
		}

		return src;
	})();
	const title = wpPost.postMeta.title ? wpPost.postMeta.title : wpPost.title;
	const description = wpPost.postMeta.description ? wpPost.postMeta.description : wpPost.excerpt;
	const ogTitle = wpPost.postMeta.ogTitle ? wpPost.postMeta.ogTitle : title;
	const ogDescription = wpPost.postMeta.ogDescription ? wpPost.postMeta.ogDescription : description;
	const ogImage = wpPost.postMeta.ogImage ? wpPost.postMeta.ogImage : featuredImgSrc;
	const type = 'article';
	const link = wpPost.link;

	return {
		title,
		description,
		ogTitle,
		ogDescription,
		ogImage,
		type,
		link
	};
}
