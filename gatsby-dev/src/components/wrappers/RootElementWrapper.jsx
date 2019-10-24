import React from 'react';
import { Provider } from 'react-redux';
import store from '../../store';

const RootElementWrapper = ({ element }) => {
	return (
		<div id="root-element-wrapper">
			<Provider store={store}>{element}</Provider>
		</div>
	);
};

export default RootElementWrapper;
