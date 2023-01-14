<template>

	<button class="create-order-btn" type="button" @click="openOrderModal">Create order</button>

	<table>
		<thead>
			<tr>
				<th><span class="sort" @click="sort('product_name')">Name</span></th>
				<th>Weight</th>
				<th><span class="sort" @click="sort('total_price')">Total price</span></th>
				<th></th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="order in orders" :key="order.id">
				<td style="width: 33%">{{ order.product_name }}</td>
				<td style="width: 33%">{{ order.weight || '-' }}</td>
				<td style="width: 33%">{{ order.total_price || '-' }}</td>
				<td>
					<button @click="openOrderModal(order.id)">Edit</button>
				</td>
			</tr>
		</tbody>
	</table>

	<Paginate
		v-if="pageCount > 1"
		:pageCount="pageCount"
		:pageRange="3"
		:marginPages="2"
		:clickHandler="changePage"
		:prevText="'Prev'"
		:nextText="'Next'"
		:containerClass="'pagination'"
		:pageClass="'page-item'"
	/>

	<OrderForm
		:isOpen="isOrderOpen"
		:data="order"
		@save="saveOrder"
		@close="closeOrderModal"
	/>

</template>

<script setup>
	import { computed, ref } from 'vue';
	import { useStore } from 'vuex';

	import OrderForm from './OrderForm.vue';
	import Paginate from 'vuejs-paginate-next';


	const store = useStore();
	const orders = computed(() => store.state.orders.orders);
	const pageCount = computed(() => store.state.orders.pageCount);
	const order = computed(() => store.state.orders.order);
	const isOrderOpen = ref(false);
	let currentPage = 1;
	let sortBy = '';
	let sortDirection = '';

	const sort = column => {
		if (sortBy === column) {
			sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
		}
		else {
			sortDirection = 'asc';
			sortBy = column;
		}

		store.dispatch('orders/getOrders', { page: currentPage, sortBy, sortDirection });
	};

	const changePage = (page) => {
		currentPage = page;
		store.dispatch('orders/getOrders', { page: currentPage });
	};

	const openOrderModal = id => {
		isOrderOpen.value = true;

		if (id) {
			store.dispatch('orders/getOrder', id);
		}
		else {
			store.dispatch('orders/resetOrder');
		}
	};

	const closeOrderModal = () => {
		isOrderOpen.value = false;
	};

	const saveOrder = data => {
		if (data.id) {
			store.dispatch('orders/updateOrder', data);
		}
		else {
			store.dispatch('orders/createOrder', data);
		}

		isOrderOpen.value = false;
	};

	store.dispatch('orders/getOrders', { page: 1 });
</script>

<style scoped>
	.create-order-btn {
		margin-bottom: 20px;
	}

	table {
		width: 100%;
		border-collapse: collapse;
	}

	td, th {
		text-align: left;
		padding: 5px;
		border-bottom: 1px solid #000;
	}

	.sort {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		user-select: none;
		cursor: pointer;
	}
	.sort::after {
		content: '';
		width: 0;
		height: 0;
		border-left: 5px solid transparent;
		border-right: 5px solid transparent;
		border-top: 5px solid #000;
	}

	.pagination {
		margin-top: 20px;
	}
</style>
