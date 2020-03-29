import React from 'react';
import { graphql } from 'gatsby';
import { BLOCKS } from '../../../enums';
import Img from 'gatsby-image';
import { SETTINGS } from '../../../settings';
import PropTypes from 'prop-types';

export const query = graphql`
	fragment gatsbyImageBlock on Media {
		id
		childWpMedia {
			altText
			childFile {
				childImageSharp {
					id
					fluid(maxWidth: 1200, srcSetBreakpoints: [200, 340, 520, 890, 960, 1100]) {
						...GatsbyImageSharpFluid_tracedSVG
					}
				}
			}
		}
	}
`;

function GatsbyImageBlock(props) {
	const imgSrc = props.media.find(item => item.id === props.block.attrs.id);

	try {
		if (!imgSrc) throw new Error('It seems that ID of gatsby image is not on the media list.');
	} catch (err) {
		console.error(err);
	}

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
