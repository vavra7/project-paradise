import { createStore } from 'redux';
import reducers from './reducers';

export const store = createStore(
	reducers,
	process.env.NODE_ENV === 'development' &&
		typeof window !== 'undefined' &&
		window.__REDUX_DEVTOOLS_EXTENSION__ &&
		window.__REDUX_DEVTOOLS_EXTENSION__()
);
