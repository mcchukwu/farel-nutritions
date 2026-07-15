<script lang="ts">
	import OrderForm from '$lib/features/order/components/OrderForm.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import ProblemSection from '$lib/components/ProblemSection.svelte';
	import ProductImages from '$lib/components/ProductImages.svelte';
	import ReviewSection from '$lib/components/ReviewSection.svelte';
	import { calculatePricing } from '$lib/features/order/utils/pricing';

	const pricing = $derived(calculatePricing(number(order.product.quantity) || 1));
</script>

<div class="mx-auto max-w-7xl px-6">
	<Hero />
	<ProblemSection />
	<ProductImages />
	<ReviewSection />
	<div id="order" class="max-w-3xl mx-auto mt-10">
		<OrderForm />
	</div>
</div>
