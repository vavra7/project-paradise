import React from 'react';
import scopedStyle from './PageTitleContainer.module.scss';
import PropTypes from 'prop-types';

function PageTitleContainer(props) {
	return (
		<div id="page-title-container" className={`${scopedStyle.pageTitleContainer}`}>
			<div className="container">
				<div className="row">
					<div className="col-xs-offset-1">
						<h1 className={`${scopedStyle.title} title-3`}>{props.title}</h1>
					</div>
				</div>
			</div>
		</div>
	);
}

PageTitleContainer.propTypes = {
	title: PropTypes.string.isRequired
};

export default PageTitleContainer;
