import React from 'react';
import PropTypes from 'prop-types';

function GeneralBlock(props) {
	const composeBlocks = block => {
		if (!block.innerBlocks.length) {
			return block.innerHTML;
		} else {
			let innerBlockIndex = 0;

			const arrayWithInnerBlocks = block.innerContent.map(markupPart => {
				if (markupPart !== null) {
					return markupPart;
				} else {
					const innerBlock = composeBlocks(block.innerBlocks[innerBlockIndex]);
					innerBlockIndex++;

					return innerBlock;
				}
			});

			return arrayWithInnerBlocks.join('');
		}
	};

	return <div className="general-block-wrapper" dangerouslySetInnerHTML={{ __html: composeBlocks(props.block) }}></div>;
}

GeneralBlock.propTypes = {
	block: PropTypes.object.isRequired
};

export default GeneralBlock;
