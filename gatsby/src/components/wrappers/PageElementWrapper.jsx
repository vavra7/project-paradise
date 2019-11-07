import React from 'react';
import FixedBarsLayout from '../layouts/FixedBarsLayout';

const PageElementWrapper = ({ element, props }) => {
	return (
		<div id="page-element-wrapper">
			<FixedBarsLayout {...props}>{element}</FixedBarsLayout>
		</div>
	);
};

export default PageElementWrapper;
