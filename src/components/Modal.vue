<template>
	<div v-if="isOpen" class="modal">
		<div class="modal__box">
			<slot></slot>
		</div>
	</div>
</template>

<script setup>
	import { defineProps } from 'vue';

	const props = defineProps({
		isOpen: Boolean
	});
</script>

<style scoped>
	.modal {
		position: fixed;
		display: flex;
		background-color: rgba(0, 0, 0, 0.5);
		padding: 20px;
		overflow: auto;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	}

	.modal__box {
		background-color: #fff;
		border-radius: 10px;
		width: 100%;
		max-width: 500px;
		margin: auto;
		padding: 20px;
	}
</style>
