import React from 'react';
import PropTypes from 'prop-types';
import FixedTopBars from '../fixedBars/FixedTopBars';
import FixedBottomBar from '../fixedBars/FixedBottomBar';

function PageElementWrapper({ element }) {
	return (
		<>
			{/* <FixedTopBars /> */}
			{element}
			<FixedBottomBar />
		</>
	);
}

PageElementWrapper.propTypes = {
	element: PropTypes.element.isRequired,
	props: PropTypes.object.isRequired
};

export default PageElementWrapper;
