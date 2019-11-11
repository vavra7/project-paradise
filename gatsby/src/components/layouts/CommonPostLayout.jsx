import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DesktopTopMenu from '../menus/DesktopTopMenu';

class CommonPostLayout extends Component {
	static propTypes = {
		children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element]).isRequired
	};

	render() {
		return (
			<div id="common-post-layout">
				<header id="main-header">
					<DesktopTopMenu />
				</header>

				<div id="content">
					<section id="primary" className="container">
						<div className="row">
							<main className="col-xs-8">
								<article>{this.props.children}</article>
							</main>

							<aside className="col-xs-4">
								Side Bar Side Bar Side Bar Side Bar Side Bar Side Bar Side Bar Side Bar Side Bar Side Bar
							</aside>
						</div>
					</section>

					<section>Instagram sekce</section>
				</div>

				<footer id="main-footer">
					Footer
				</footer>
			</div>
		);
	}
}

export default CommonPostLayout;
