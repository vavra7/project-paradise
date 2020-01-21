import appRootReducer from './appRootReducer';
import fixedBarsReducer from './fixedBarsReducer';
import settingsReducer from './settingsReducer';
import { combineReducers } from 'redux';

const reducers = combineReducers({
	appRoot: appRootReducer,
	fixedBars: fixedBarsReducer,
	settings: settingsReducer
});

export default reducers;
