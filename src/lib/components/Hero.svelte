<script lang="ts">
	import CTAButton from './CTAButton.svelte';
	import TrustBadge from './TrustBadge.svelte';
	import BreyleeTeethWhiteningPowder from '$lib/assets/product.png?enhanced';

	const badges = ['Safe on Enamel', 'Fast Nationwide Delivery', 'Pay on Confirmation'];
</script>

<section class="overflow-hidden">
	<div class="mx-auto grid items-center gap-16 py-10 lg:grid-cols-2">
		<div class="space-y-6">
			<div
				class="inline-flex rounded-xl bg-green-100 px-4 py-2 text-sm font-semibold text-green-700"
			>
				Professional Teeth Whitening
			</div>

			<h1
				class="max-w-xl text-5xl font-black leading-tight tracking-tight text-slate-900 lg:text-7xl"
			>
				Restore Your
				<span class="text-green-600"> Natural White Smile </span>
			</h1>

			<p class="max-w-xl text-lg leading-8 text-slate-600">
				Remove years of coffee, tea and smoking stains with Breylee Teeth Whitening Powder. A
				brighter smile starts from your first use.
			</p>

			<div class="flex items-center gap-4">
				<div>
					<p class="text-sm text-slate-500">Starting From</p>

					<p class="text-5xl font-black text-slate-900">₦14,000</p>
				</div>
			</div>

			<CTAButton label="Order Now" />

			<div class="flex flex-wrap gap-3 pt-2">
				{#each badges as badge (badge)}
					<TrustBadge text={badge} />
				{/each}
			</div>
		</div>

		<div class="flex justify-center">
			<enhanced:img
				src={BreyleeTeethWhiteningPowder}
				alt="Breylee Teeth Whitening Powder"
				class="w-full max-w-xl"
			/>
		</div>
	</div>
</section>
