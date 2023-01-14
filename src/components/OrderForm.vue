<template>
	<Modal :isOpen="props.isOpen" @close="$emit('closeOrderModal')">
		<form action="">

			<div class="form-group">
				<label for="product-name">Product name</label>
				<input id="product-name" type="text" v-model="data.product_name">
			</div>

			<div class="form-group">
				<label for="description">Description</label>
				<textarea id="description" rows="10" v-model="data.description"></textarea>
			</div>

			<div class="form-group">
				<label for="weight">Weight</label>
				<input id="weight" type="number" min="0" v-model="data.weight">
			</div>

			<div class="form-group">
				<label for="total-price">Total price</label>
				<input id="total-price" type="number" min="0" v-model="data.total_price">
			</div>

			<div class="actions">
				<button type="button" @click="$emit('close')">Cancel</button>
				<button type="button" @click="$emit('save', data)">Save</button>
			</div>

		</form>
	</Modal>
</template>

<script setup>
	import { defineProps, ref, watch } from 'vue';
	import Modal from './Modal.vue';

	const props = defineProps({
		isOpen: Boolean,
		data: Object
	});

	const data = ref({});

	watch(props, (currentValue) => {
		data.value = {...currentValue.data};
	});
</script>

<style scoped>
	form {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 5px;
	}

	input,
	textarea {
		display: block;
		font-size: 16px;
		padding-left: 10px;
		padding-right: 10px;
	}

	input {
		height: 30px;
	}

	textarea {
		resize: vertical;
		padding-top: 10px;
		padding-bottom: 10px;
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
	}
</style>
