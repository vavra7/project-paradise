import { createStore } from 'redux';
import reducers from './reducers';

const store = createStore(
	reducers,
	// TODO: Remove Redux extension code on production
	typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
