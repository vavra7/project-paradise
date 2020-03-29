import { graphql } from 'gatsby';

export const query = graphql`
	fragment wpPostsOfCategoryMeta on wpCategory {
		name
		link
	}
`;

export function getWpPostsOfCategoryMeta(wpCategory) {
	const title = wpCategory.name;
	const ogTitle = title;
	const link = wpCategory.link;

	return {
		title,
		ogTitle,
		link
	};
}
