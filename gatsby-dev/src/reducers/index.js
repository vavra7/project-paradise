import appRootReducer from './appRootReducer';
import { combineReducers } from 'redux';

const reducers = combineReducers({
	app: appRootReducer
});

export default reducers;
