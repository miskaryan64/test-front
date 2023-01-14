import networkHelper from '../networkHelper';

export default {
	async getAll(page = 1, sortBy = '', sortDirection = '') {
		return (await networkHelper.get(`orders?page=${page}&sortBy=${sortBy}&sortDirection=${sortDirection}`)).data;
	},

	async getById() {
		return (await networkHelper.get(`orders/${id}`)).data;
	},

	async create(payload) {
		return (await networkHelper.post('orders', payload)).data;
	},

	async update(id, payload) {
		return (await networkHelper.put(`orders/${id}`, payload)).data;
	}
};
