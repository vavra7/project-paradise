import { POST_TYPES, TRANSLATION_LINK_META } from '../../../enums';

export const getTranslationPostTypes = postType => {
	switch (postType) {
		case POST_TYPES.POST:
			return {
				postTypes: [POST_TYPES.POST_EN, POST_TYPES.PAGE_EN],
				metaKey: TRANSLATION_LINK_META.TRANSLATION_EN
			};

		case POST_TYPES.PAGE:
			return {
				postTypes: [POST_TYPES.POST_EN, POST_TYPES.PAGE_EN],
				metaKey: TRANSLATION_LINK_META.TRANSLATION_EN
			};

		case POST_TYPES.POST_EN:
			return {
				postTypes: [POST_TYPES.POST, POST_TYPES.PAGE],
				metaKey: TRANSLATION_LINK_META.TRANSLATION_CS
			};

		case POST_TYPES.PAGE_EN:
			return {
				postTypes: [POST_TYPES.POST, POST_TYPES.PAGE],
				metaKey: TRANSLATION_LINK_META.TRANSLATION_CS
			};

		default:
			return {
				postTypes: [],
				metaKey: ''
			};
	}
};
