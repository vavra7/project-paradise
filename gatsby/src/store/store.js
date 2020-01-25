import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import appRootReducer from './appRoot/reducer';
import fixedBarsReducer from './fixedBars/reducer';
import tagsReducer from './tags/reducer';

const composeEnhancers =
	process.env.NODE_ENV === 'development' && typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ actionsBlacklist: ['SET_WIDTH_HEIGHT'] })
		: compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

const rootReducer = combineReducers({
	appRoot: appRootReducer,
	fixedBars: fixedBarsReducer,
	wpTags: tagsReducer
});

export const store = createStore(rootReducer, enhancer);
