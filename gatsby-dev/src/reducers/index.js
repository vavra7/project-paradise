import appRootReducer from './appRootReducer';
import mobileMenuOpen from './mobileMenuOpen';
import windowWidth from './windowWidth';
import { combineReducers } from 'redux';

const reducers = combineReducers({
	app: appRootReducer,
	mobileMenuOpenState: mobileMenuOpen,
	windowWidth
});

export default reducers;
