import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';

const ASPECT_RATIO = 1.6;

function FeaturedImage(props) {
	const image = props.featuredImgSrc ? <Img fluid={{ ...props.featuredImgSrc, aspectRatio: ASPECT_RATIO }} /> : '';

	return <div className="entry-featured-image">{image}</div>;
}

FeaturedImage.propTypes = {
	featuredImgSrc: PropTypes.object
};

export default FeaturedImage;
