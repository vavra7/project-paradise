import { combineReducers } from 'redux';
import appRootReducer from './appRootReducer';
import fixedMenusReducer from './fixedMenusReducer';

const reducers = combineReducers({
	app: appRootReducer,
	fixedMenus: fixedMenusReducer
});

export default reducers;
