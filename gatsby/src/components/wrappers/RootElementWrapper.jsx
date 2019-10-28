import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../../reducers'
import AppRootHandler from './components/AppRootHandler';

const store = createStore(
	reducers,
	// TODO: Remove Redux extension code on production
	typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

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
