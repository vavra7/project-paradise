import React from 'react';
import { Provider } from 'react-redux';
import AppRootHandler from './components/AppRootHandler';
import { store } from '../../store';

function RootElementWrapper({ element }) {
	return (
		<>
			<Provider store={store}>
				<AppRootHandler>{element}</AppRootHandler>
			</Provider>
		</>
	);
}

export default RootElementWrapper;
