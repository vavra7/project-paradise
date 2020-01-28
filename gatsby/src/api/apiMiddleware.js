import axios from 'axios';
import { requestSent, requestSuccess, requestError } from '../store/requests/actions';

const apiMiddleware = ({ dispatch }) => next => action => {
	next(action);

	if (!action.apiRequest) return;

	const { url, method, headers, reduce, onSuccess, onError } = action.payload;
	const requestId = action.payload.requestId ? action.payload.requestId : action.type;

	axios.defaults.headers.common['Content-Type'] = 'application/json';

	dispatch(requestSent({ requestId }));

	axios
		.request({ url, method, headers })
		.then(res => {
			//#region [rgba(46, 204, 113, 0.03)]

			setTimeout(() => {
				let data;

				if (typeof reduce === 'function') {
					data = reduce(res);
				} else {
					data = res;
				}

				if (typeof onSuccess === 'function') {
					dispatch(onSuccess({ data, action }));
				}
				dispatch(requestSuccess({ requestId }));
			}, 1000);
		})

		//#endregion
		.catch(err => {
			//#region [rgba(231, 76, 60, 0.03)]

			if (typeof onError === 'function') {
				dispatch(onError({ action }));
			}

			dispatch(requestError({ requestId, error: err.message }));

			//#endregion
		});
};

export default apiMiddleware;
