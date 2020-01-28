import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import apiMiddleware from '../api/apiMiddleware';

import appRootReducer from './appRoot/reducer';
import fixedBarsReducer from './fixedBars/reducer';
import requestsReducer from './requests/reducer';
import wpReducer from './wp/reducer';

const composeEnhancers =
	process.env.NODE_ENV === 'development' && typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ actionsBlacklist: ['SET_WIDTH_HEIGHT'] })
		: compose;

const enhancer = composeEnhancers(applyMiddleware(apiMiddleware));

const rootReducer = combineReducers({
	appRoot: appRootReducer,
	fixedBars: fixedBarsReducer,
	request: requestsReducer,
	wp: wpReducer
});

export const store = createStore(rootReducer, enhancer);
