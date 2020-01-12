import React from 'react';
import FeaturedImage from './components/FeaturedImage';
import PropTypes from 'prop-types';
import scopedStyles from './Post.module.scss';

function Post(props) {
	return (
		<article>
			<header className="post-header">
				<div className={`post-featured-image ${scopedStyles.smDownNoGutter}`}>
					<FeaturedImage featuredMedia={props.featuredMedia} />
				</div>
			</header>

			<div className={`post-content ${scopedStyles.xlNarrow} ${scopedStyles.lgNarrow}`}>{props.children}</div>

			<footer className="post-footer"></footer>
		</article>
	);
}

Post.propTypes = {
	featuredMedia: PropTypes.object.isRequired
};

export default Post;
