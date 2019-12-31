import React from 'react';
import PropTypes from 'prop-types';
import { BLOCKS } from '../../enums';
import GeneralBlock from './GeneralBlock';
import GatsbyImageBlock from './gatsbyBlocks/GatsbyImageBlock';
import CoreGroupBlock from './coreBlocks/CoreGroupBlock';

function BlocksRouter(props) {
	return (
		<>
			{props.blocks.map((block, index) => {
				switch (block.blockName) {
					case BLOCKS.CORE_GROUP.NAME:
						return <CoreGroupBlock key={index} block={block} media={props.media} />;
					case BLOCKS.GATSBY_IMAGE.NAME:
						return <GatsbyImageBlock key={index} block={block} media={props.media} />;
					default:
						return <GeneralBlock key={index} block={block} />;
				}
			})}
		</>
	);
}

BlocksRouter.propTypes = {
	blocks: PropTypes.array.isRequired,
	media: PropTypes.array.isRequired
};

export default BlocksRouter;
