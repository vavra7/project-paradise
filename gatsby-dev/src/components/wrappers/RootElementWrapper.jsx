import React from 'react';
import { Provider } from 'react-redux';
import store from '../../store';
import AppRootHandler from './components/AppRootHandler';

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
