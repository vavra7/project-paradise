import React from 'react';
import { graphql } from 'gatsby';
import FeaturedImage from './components/FeaturedImage';
import scopedStyles from './Post.module.scss';
import PropTypes from 'prop-types';

export const query = graphql`
	fragment post on wpPost {
		featuredMedia {
			...featuredImage
		}
	}
`;

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
	featuredMedia: PropTypes.object.isRequired,
	children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element])
};

export default Post;
