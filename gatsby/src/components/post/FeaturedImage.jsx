import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import { SETTINGS } from '../../settings';

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

	return <div className="entry-featured-image">{image}</div>;
}

FeaturedImage.propTypes = {
	featuredMedia: PropTypes.object.isRequired
};

export default FeaturedImage;
