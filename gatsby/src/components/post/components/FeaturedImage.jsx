import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import { SETTINGS } from '../../../settings';

export const query = graphql`
	fragment featuredImage on Media {
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

const ASPECT_RATIO = 1.6;

function FeaturedImage(props) {
	const image =
		props.featuredMedia.id && props.featuredMedia.childWpMedia ? (
			<Img
				fluid={{ ...props.featuredMedia.childWpMedia.childFile.childImageSharp.fluid, aspectRatio: ASPECT_RATIO }}
				durationFadeIn={SETTINGS.IMG_DURATION_FADE_IN}
				alt={props.featuredMedia.childWpMedia.altText}
			/>
		) : (
			''
		);

	return image;
}

FeaturedImage.propTypes = {
	featuredMedia: PropTypes.object.isRequired
};

export default FeaturedImage;
