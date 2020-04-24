import { useEffect, useState } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { withSelect, withDispatch } from '@wordpress/data';
import { BaseControl } from '@wordpress/components';
import { getTranslationPostTypes } from '../translation-post-types';
import { __ } from '@wordpress/i18n';
import { TRANSLATION_LINK_META } from '../../../../enums';

function AutocompleteLink(props) {
	const [searchVal, setSearchVal] = useState('');

	useEffect(() => {
		if (!props.options.length || !props.metaVal) return;
		const item = props.options.find(option => option.value === props.metaVal);
		if (!item) return;
		if (item.label !== searchVal) {
			setSearchVal(item.label);
		}
	}, [props.options, props.metaVal]);

	const onSearchChange = e => {
		const searchVal = e.target.value;
		setSearchVal(searchVal);

		const item = props.options.find(option => option.label === searchVal);
		if (item) {
			props.setMetaVal(item.value);
		} else {
			props.setMetaVal(0);
		}
	};

	const onSearchBlur = () => {
		if (!props.metaVal) {
			setSearchVal('');
		}
	};

	let label = '';

	switch (props.translationPostTypes.metaKey) {
		case TRANSLATION_LINK_META.TRANSLATION_EN:
			label = __('Link to en', 'project-paradise');
			break;

		case TRANSLATION_LINK_META.TRANSLATION_CS:
			label = __('Link to cs', 'project-paradise');
			break;

		default:
			label = __('', 'project-paradise');
			break;
	}

	return (
		<>
			<BaseControl id="autocomplete-link" label={label}>
				<input
					id="autocomplete-link"
					className="components-select-control__input"
					list="autocomplete-link-list"
					value={searchVal}
					type="text"
					onChange={onSearchChange}
					onBlur={onSearchBlur}
				/>

				<datalist id="autocomplete-link-list">
					{props.options.map(option => (
						<option data-value={option.value} value={option.label} />
					))}
				</datalist>
			</BaseControl>
		</>
	);
}

const mapSelectToProps = withSelect(select => {
	const translationPostTypes = getTranslationPostTypes(select('core/editor').getCurrentPostType());
	let options = [];
	const getPostOptions = postType => {
		const posts = select('core').getEntityRecords('postType', postType, { status: ['publish', 'draft'] });

		if (posts) {
			return posts.map(post => ({
				value: post.id,
				label: post.title.raw
			}));
		} else {
			return [];
		}
	};

	translationPostTypes.postTypes.forEach(postType => {
		options = [...options, ...getPostOptions(postType)];
	});

	return {
		translationPostTypes,
		options,
		metaVal: select('core/editor').getEditedPostAttribute('meta')[translationPostTypes.metaKey]
	};
});

const mapDispatchToProps = withDispatch((dispatch, props) => {
	return {
		setMetaVal: newVal =>
			dispatch('core/editor').editPost({
				meta: { [props.translationPostTypes.metaKey]: newVal }
			})
	};
});

export default compose(mapSelectToProps, mapDispatchToProps)(AutocompleteLink);
