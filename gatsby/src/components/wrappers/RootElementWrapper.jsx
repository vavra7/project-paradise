import React from 'react';
import { Provider } from 'react-redux';
import AppRootHandler from './components/AppRootHandler';
import { store } from '../../store';

const RootElementWrapper = ({ element }) => {
	return (
		<div id="root-element-wrapper">
			<Provider store={store}>
				<AppRootHandler>{element}</AppRootHandler>
			</Provider>
		</div>
	);
};

export default RootElementWrapper;
