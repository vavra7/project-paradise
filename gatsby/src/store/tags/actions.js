import { TAGS } from './types';
import axios from 'axios';

const setData = data => ({
	type: TAGS.SET_DATA,
	payload: data
});

const fetchData = () => dispatch => {
	return axios.get('http://localhost:8069/wp-json/wp/v2/tags?_fields=id,%20path,%20name').then(res => {
		dispatch(setData(res.data));
	});
};

export { fetchData };
