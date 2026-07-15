<script lang="ts">
	import Review01 from '$lib/assets/images/reviews/01-whatsapp.png';
	import Review02 from '$lib/assets/images/reviews/02-whatsapp.png';
	import Review03 from '$lib/assets/images/reviews/03-whatsapp.png';

	const reviews = [
		{
			src: Review01,
			alt: 'Customer WhatsApp review 1'
		},
		{
			src: Review02,
			alt: 'Customer WhatsApp review 2'
		},
		{
			src: Review03,
			alt: 'Customer WhatsApp review 3'
		}
	];
</script>

<section>
	<div class="mx-auto py-10">
		<div class="max-w-3xl mx-auto">
			<h2 class="text-4xl font-black text-slate-900">What Our Customers Are Saying</h2>

			<p class="mt-4 text-lg text-slate-600">
				Real conversations from customers who have purchased BREYLEE.
			</p>
		</div>

		<div class="mt-10 max-w-4xl mx-auto grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each reviews as review (review.alt)}
				<enhanced:img
					src={review.src}
					alt={review.alt}
					class="mx-auto h-auto w-full max-w-xs rounded-2xl object-contain"
					sizes="(max-width: 640px) 100vw,
			       (max-width: 1024px) 50vw,
			       33vw"
				/>
			{/each}
		</div>
	</div>
</section>
