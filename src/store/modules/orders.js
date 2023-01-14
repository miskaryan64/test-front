import OrderApi from '../../api/order'

const state = () => ({
	orders: [],
	pageCount: 0,
	order: {}
})

const getters = {
	orders: state => state.orders,
	pageCount: state => state.pageCount,
	order: state => state.order
}

const mutations = {
	setOrders: (state, value) => state.orders = value,
	setPageCount: (state, value) => state.pageCount = value,
	setOrder: (state, value) => state.order = value
};

const actions = {
	async getOrders ({ commit }, { page, sortBy, sortDirection }) {
		const result = await OrderApi.getAll(page, sortBy, sortDirection);
		const orders = result.data;
		const pageCount = Math.ceil(result.meta.total / result.meta.per_page);

		commit('setOrders', orders);
		commit('setPageCount', pageCount);
	},

	async getOrder ({ state, commit }, id) {
		const order = state.orders.find(item => item.id === id);
		commit('setOrder', order);
	},

	async resetOrder ({ state, commit }) {
		commit('setOrder', {});
	},

	async createOrder ({ state, commit, dispatch }, data) {
		const order = (await OrderApi.create(data)).data;
		dispatch('getOrders', { page: 1 });
	},

	async updateOrder ({ state, commit }, data) {
		const order = (await OrderApi.update(data.id, data)).data;
		const orders = [...state.orders];
		const orderIndex = orders.findIndex(item => item.id === order.id);

		orders[orderIndex] = order;

		commit('setOrder', order);
		commit('setOrders', orders);
	}
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
};
