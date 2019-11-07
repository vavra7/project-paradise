import appRootReducer from './appRootReducer';
import fixedBarsReducer from './fixedBarsReducer';
import { combineReducers } from 'redux';

const reducers = combineReducers({
	app: appRootReducer,
	fixedBars: fixedBarsReducer
});

export default reducers;
