import React from 'react';
import FixedBarsLayout from '../layouts/FixedBarsLayout';

function PageElementWrapper({ element, props }) {
	return (
		<>
			<FixedBarsLayout {...props}>{element}</FixedBarsLayout>
		</>
	);
}

export default PageElementWrapper;
