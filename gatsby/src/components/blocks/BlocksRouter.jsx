import React from 'react';
import { graphql } from 'gatsby';
import { BLOCKS } from '../../enums';
import GeneralBlock from './GeneralBlock';
import GatsbyImageBlock from './gatsbyBlocks/GatsbyImageBlock';
import CoreGroupBlock from './coreBlocks/CoreGroupBlock';
import PropTypes from 'prop-types';

export const query = graphql`
	fragment blocksRouter on wpPost {
		blocks
		media {
			...gatsbyImageBlock
		}
	}
`;

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
