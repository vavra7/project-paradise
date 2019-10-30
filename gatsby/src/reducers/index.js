import appRootReducer from './appRootReducer';
import fixedMenusReducer from './fixedMenusReducer';
import { combineReducers } from 'redux';

const reducers = combineReducers({
	app: appRootReducer,
	fixedMenus: fixedMenusReducer
});

export default reducers;
