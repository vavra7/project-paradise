import axios from 'axios';
import { requestSent, requestSuccess, requestError } from '../store/requests/actions';

const apiMiddleware = ({ dispatch }) => next => action => {
	if ('apiRequest' in action) {
		const { id = action.type, config, params = {} } = action.apiRequest;

		axios.defaults.headers.common['Content-Type'] = 'application/json';

		dispatch(requestSent({ id }));

		axios
			.request(config(params))
			.then(res => {
				//#region [rgba(46, 204, 113, 0.03)]
				setTimeout(() => {
					next({
						type: action.type,
						payload: {
							...action.payload,
							response: res
						}
					});

					dispatch(requestSuccess({ id }));
				}, 1000);
				//#endregion
			})
			.catch(err => {
				//#region [rgba(231, 76, 60, 0.03)]
				dispatch(requestError({ id, error: err.message }));
				//#endregion
			});
	} else {
		next(action);
	}
};

export default apiMiddleware;
