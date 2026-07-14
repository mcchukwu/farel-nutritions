<script lang="ts">
	import OrderForm from '$lib/features/order/components/OrderForm.svelte';
	import Hero from '$lib/components/Hero.svelte';
</script>

<div class="mx-auto max-w-7xl px-6">
	<Hero />
	<div id="order" class="max-w-3xl mx-auto mt-10">
		<OrderForm />
	</div>
</div>
