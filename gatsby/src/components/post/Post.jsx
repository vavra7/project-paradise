import React from 'react';
import FeaturedImage from './components/FeaturedImage';
import PropTypes from 'prop-types';

function Post(props) {
	return (
		<article>
			<header className="post-header">
				<FeaturedImage featuredMedia={props.featuredMedia} />
			</header>

			<div className="post-content">{props.children}</div>

			<footer className="post-footer"></footer>
		</article>
	);
}

Post.propTypes = {
	featuredMedia: PropTypes.object.isRequired
};

export default Post;
