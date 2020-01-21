import React from 'react';
import FixedBarsLayout from '../layouts/FixedBarsLayout';
import PropTypes from 'prop-types';

function PageElementWrapper({ element, props }) {
	return (
		<>
			{/* <FixedBarsLayout {...props}> */}
			{element}
			{/* </FixedBarsLayout> */}
		</>
	);
}

PageElementWrapper.propTypes = {
	element: PropTypes.element.isRequired,
	props: PropTypes.object.isRequired
};

export default PageElementWrapper;
