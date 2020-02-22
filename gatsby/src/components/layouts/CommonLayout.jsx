import React from 'react';
import PropTypes from 'prop-types';
import StaticTopBar from '../header/StaticTopBar';
import MainMenuContainer from '../header/MainMenuContainer';
import PageTitleContainer from '../header/PageTitleContainer';
import { useSelector } from 'react-redux';
import { MOBILE_TOP_BAR_HEIGHT } from '../fixedBars/FixedTopBars.module.scss';
import { BOTTOM_BAR_HEIGHT } from '../fixedBars/FixedBottomBar.module.scss';
import SearchInput from '../commons/inputs/SearchInput';

function CommonLayout(props) {
	const { breadCrumbsSlot, title, children } = props;
	const mobileTopBarEnabled = useSelector(state => state.fixedBars.mobileTopBarEnabled);
	const bottomBarEnabled = useSelector(state => state.fixedBars.bottomBarEnabled);

	const topBarOffsetStyle = mobileTopBarEnabled ? { paddingTop: MOBILE_TOP_BAR_HEIGHT } : null;
	const bottomBarOffsetStyle = bottomBarEnabled ? { paddingBottom: BOTTOM_BAR_HEIGHT } : null;

	return (
		<>
			<header id="main-header" style={topBarOffsetStyle}>
				<StaticTopBar />
				<MainMenuContainer />
				{ breadCrumbsSlot }
				<PageTitleContainer title={title} />
			</header>

			<section id="primary" className="container">
				<div className="row">
					<main id="content" className="col-xs-12 col-md-8" role="main">
						{children}
					</main>

					<aside className="col-md-4 hide-sm-down">
						Side Bar Side Bar Side Bar Side Bar Side Bar Side Bar Side Bar Side Bar Side Bar Side Bar
					</aside>
				</div>
			</section>

			<section>Instagram section</section>

			<footer id="main-footer" style={bottomBarOffsetStyle}>
				Footer
				<SearchInput />
			</footer>
		</>
	);
}

CommonLayout.propTypes = {
	children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
	title: PropTypes.string.isRequired,
	breadCrumbsSlot: PropTypes.element
};

export default CommonLayout;
