import React from 'react';
import PropTypes from 'prop-types';
import { BLOCKS } from '../../../enums';
import BlockRouter from '../BlocksRouter';

function CoreGroupBlock(props) {
	const kebabToCamel = string => {
		return string.replace(/-(\w)/g, m => m[1].toUpperCase());
	};

	const parseStyles = styles => {
		let stylesObject = {};
		if (!styles) return stylesObject;

		const stylesArray = styles.match(/[^;]+/gi);
		if (!stylesArray) return stylesObject;

		stylesArray.forEach(style => {
			const parsedStyle = style.match(/([-\w+]+)\s?:((?<=:).*$)/i);
			stylesObject[kebabToCamel(parsedStyle[1]).trim()] = parsedStyle[2].trim();
		});

		return stylesObject;
	};

	const extractClassesStyles = (innerHTML, blockClass) => {
		const pattern = new RegExp(
			`(?<=class=)"((?:[-\\w]+\\s)*${blockClass}(?:\\s[-\\w]+)*)".+?(?:(?<=style=)"([^"]+))?"`,
			'i'
		);

		let result = innerHTML.match(pattern);
		if (!result) result = [];

		return {
			blockClasses: result[1],
			blockStyles: parseStyles(result[2])
		};
	};

	const { blockClasses, blockStyles } = extractClassesStyles(props.block.innerHTML, BLOCKS.CORE_GROUP.CLASS);

	return (
		<div className={`${BLOCKS.CORE_GROUP.CLASS}-wrapper`}>
			<div className={blockClasses} style={blockStyles}>
				<div className={`${BLOCKS.CORE_GROUP.CLASS}__inner-container`}>
					<BlockRouter blocks={props.block.innerBlocks} media={props.media} />
				</div>
			</div>
		</div>
	);
}

CoreGroupBlock.propTypes = {
	block: PropTypes.object.isRequired,
	media: PropTypes.array.isRequired
};

export default CoreGroupBlock;
