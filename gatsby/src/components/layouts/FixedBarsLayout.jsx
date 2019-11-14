import React from 'react';
import PropTypes from 'prop-types';
import FixedTopBars from './bars/FixedTopBars';
import FixedBottomBar from './bars/FixedBottomBar';

function FixedBarsLayout(props) {
	return (
		<>
			<FixedTopBars />

			{props.children}

			<FixedBottomBar />
		</>
	);
}

FixedBarsLayout.propTypes = {
	children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element]).isRequired
};

export default FixedBarsLayout;
