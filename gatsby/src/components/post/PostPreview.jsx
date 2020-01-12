import React from 'react';
import PropTypes from 'prop-types';
import FeaturedImage from './components/FeaturedImage';
import { Link } from 'gatsby';
import scopedStyles from './PostPreview.module.scss';

function PostPreview(props) {
	const path = props.post.path;
	const featuredMedia = props.post.featuredMedia;
	const title = props.post.title;
	const excerpt = props.post.excerpt;

	return (
		<article>
			<header className="post-prev-header">
				<div className="post-prev-featured-image">
					<FeaturedImage featuredMedia={featuredMedia} />
				</div>

				<h2 className={`post-prev-title ${scopedStyles.xlNarrow} ${scopedStyles.lgNarrow}`}>
					<Link to={path}>{title}</Link>
				</h2>
			</header>

			<div
				className={`post-prev-excerpt ${scopedStyles.xlNarrow} ${scopedStyles.lgNarrow}`}
				dangerouslySetInnerHTML={{ __html: excerpt }}
			/>

			<footer className="post-prev-footer"></footer>
		</article>
	);
}

PostPreview.propTypes = {
	post: PropTypes.object.isRequired
};

export default PostPreview;
