import React from 'react';
import PropTypes from 'prop-types';
import StaticTopBar from '../header/StaticTopBar';
import MainMenuContainer from '../header/MainMenuContainer';
import BreadCrumbsContainer from '../header/BreadCrumbsContainer';
import PageTitleContainer from '../header/PageTitleContainer';

function CommonLayout(props) {
	return (
		<>
			<header id="main-header">
				<StaticTopBar />
				<MainMenuContainer />
				<BreadCrumbsContainer
					isPageOnFront={props.isPageOnFront}
					isPageForPosts={props.isPageForPosts}
					current={props.title}
				/>
				<PageTitleContainer title={props.title} />
			</header>

			<section id="primary" className="container">
				<div className="row">
					<main id="content" className="col-xs-12 col-md-8" role="main">
						{props.children}
					</main>

					<aside className="col-md-4 hide-sm-down">
						Side Bar Side Bar Side Bar Side Bar Side Bar Side Bar Side Bar Side Bar Side Bar Side Bar
					</aside>
				</div>
			</section>

			<section>Instagram section</section>

			<footer id="main-footer">Footer</footer>
		</>
	);
}

CommonLayout.propTypes = {
	children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
	title: PropTypes.string.isRequired,
	isPageOnFront: PropTypes.bool,
	isPageForPosts: PropTypes.bool
};

CommonLayout.defaultProps = {
	isPageOnFront: false,
	isPageForPosts: false
};

export default CommonLayout;
