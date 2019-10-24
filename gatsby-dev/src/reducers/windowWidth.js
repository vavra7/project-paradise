const windowWidthReducer = (state = null, action) => {
	switch (action.type) {
		case 'RESIZE':
			return 'new width';
		default:
			return state;
	}
};

export default windowWidthReducer;
