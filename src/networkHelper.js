import axios from 'axios';

const basePath = 'http://127.0.0.1:8000/api/';

export default {
	async get(path) {
		return axios.get(basePath + path);
	},

	async post(path, payload) {
		return axios.post(basePath + path, payload);
	},

	async put(path, payload) {
		return axios.put(basePath + path, payload);
	}
};
