import React from 'react';
import PropTypes from 'prop-types';
import FeaturedImage from './components/FeaturedImage';
import { Link } from 'gatsby';

function PostPreview(props) {
	const path = props.post.path;
	const featuredMedia = props.post.featuredMedia;
	const title = props.post.title;
	const excerpt = props.post.excerpt;

	return (
		<article>
			<header className="post-prev-header">
				<FeaturedImage featuredMedia={featuredMedia} />

				<h2 className="post-prev-title">
					<Link to={path}>{title}</Link>
				</h2>
			</header>

			<div className="post-prev-excerpt" dangerouslySetInnerHTML={{ __html: excerpt }} />

			<footer className="post-prev-footer"></footer>
		</article>
	);
}

PostPreview.propTypes = {
	post: PropTypes.object.isRequired
};

export default PostPreview;
