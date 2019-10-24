import React from 'react';
import FixedMenusLayout from '../layouts/FixedMenusLayout';

const PageElementWrapper = ({ element, props }) => {
	return (
		<div id="page-element-wrapper">
			<FixedMenusLayout {...props}>{element}</FixedMenusLayout>
		</div>
	);
};

export default PageElementWrapper;
