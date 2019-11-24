import React from 'react';
import PropTypes from 'prop-types';
import FixedTopBars from '../fixedBars/FixedTopBars';
import FixedBottomBar from '../fixedBars/FixedBottomBar';

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
