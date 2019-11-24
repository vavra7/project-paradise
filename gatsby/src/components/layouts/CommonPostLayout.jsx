import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StaticTopBar from '../header/StaticTopBar';
import MainMenuContainer from '../header/MainMenuContainer';
import BreadCrumbsContainer from '../header/BreadCrumbsContainer';
import PageTitleContainer from '../header/PageTitleContainer';

class CommonPostLayout extends Component {
	static propTypes = {
		children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element]).isRequired,
		title: PropTypes.string.isRequired
	};

	render() {
		return (
			<>
				<header id="main-header">
					<StaticTopBar />
					<MainMenuContainer />
					<BreadCrumbsContainer />
					<PageTitleContainer title={this.props.title} />
				</header>

				<section id="primary" className="container">
					<div className="row">
						<main id="content" className="col-xs-12 col-md-8" role="main">
							<article>{this.props.children}</article>
						</main>

						<aside className="col-md-4 hide-sm-down">
							Side Bar Side Bar Side Bar Side Bar Side Bar Side Bar Side Bar Side Bar Side Bar Side Bar
						</aside>
					</div>
				</section>

				<section>Instagram sekce</section>

				<footer id="main-footer">Footer</footer>
			</>
		);
	}
}

export default CommonPostLayout;
