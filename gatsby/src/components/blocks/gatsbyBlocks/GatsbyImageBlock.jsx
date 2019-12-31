import React from 'react';
import PropTypes from 'prop-types';
import { BLOCKS } from '../../../enums';
import Img from 'gatsby-image';
import { SETTINGS } from '../../../settings';

function GatsbyImageBlock(props) {
	const imgSrc = props.media.find(item => item.id === props.block.attrs.id);

	return (
		<div className={`${BLOCKS.GATSBY_IMAGE.CLASS}-wrapper`}>
			<div className={BLOCKS.GATSBY_IMAGE.CLASS}>
				<Img
					fluid={{ ...imgSrc.childWpMedia.childFile.childImageSharp.fluid }}
					durationFadeIn={SETTINGS.IMG_DURATION_FADE_IN}
					alt={imgSrc.childWpMedia.altText}
				/>
			</div>
		</div>
	);
}

GatsbyImageBlock.propTypes = {
	block: PropTypes.object.isRequired,
	media: PropTypes.array.isRequired
};

export default GatsbyImageBlock;
