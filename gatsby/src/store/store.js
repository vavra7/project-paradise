import { createStore } from 'redux';
import { combineReducers } from 'redux';

import appRootReducer from './appRoot/reducer';
import fixedBarsReducer from './fixedBars/reducer';

const rootReducer = combineReducers({
	appRoot: appRootReducer,
	fixedBars: fixedBarsReducer
});

export const store = createStore(
	rootReducer,
	process.env.NODE_ENV === 'development' &&
		typeof window !== 'undefined' &&
		window.__REDUX_DEVTOOLS_EXTENSION__ &&
		window.__REDUX_DEVTOOLS_EXTENSION__()
);
