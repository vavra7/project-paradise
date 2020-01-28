const getState = (state, requestId) => {
	const requestState = state.api[requestId];
	const proxy = {
		pending: null,
		error: null
	};

	return requestState ? requestState : proxy;
};

export { getState };
