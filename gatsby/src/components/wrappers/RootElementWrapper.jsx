import React from 'react';
import { Provider } from 'react-redux';
import AppRootHandler from './components/AppRootHandler';
import { store } from '../../store';
import PropTypes from 'prop-types';

function RootElementWrapper({ element }) {
	return (
		<>
			<Provider store={store}>
				<AppRootHandler>{element}</AppRootHandler>
			</Provider>
		</>
	);
}

RootElementWrapper.propTypes = {
	element: PropTypes.element.isRequired
};

export default RootElementWrapper;
