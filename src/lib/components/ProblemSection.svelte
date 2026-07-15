<script lang="ts">
	const problems = [
		'Your teeth have become yellow over time.',
		'Coffee, tea or smoking has left stubborn stains.',
		'You avoid smiling confidently in photos.',
		"You're tired of whitening toothpaste that doesn't seem to help.",
		'Professional whitening treatments feel too expensive.'
	];
</script>

<section>
	<div class="mx-auto max-w-3xl pt-18">
		<h2 class="text-4xl font-black text-slate-900">Does Any Of These Sound Familiar?</h2>

		<p class="mt-4 text-slate-600">If you answered yes to any of these, you're not alone.</p>

		<div class="flex flex-wrap gap-4 mt-6">
			{#each problems as problem (problem)}
				<div class="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm">
					<div class="h-3 w-3 shrink-0 rounded-full bg-green-500"></div>

					<p class="text-lg text-slate-700">
						{problem}
					</p>
				</div>
			{/each}
		</div>

		<div class="mt-10 rounded-2xl bg-green-600 p-4 text-white">
			<h3 class="text-3xl font-bold">There's a Better Way</h3>

			<p class="mt-4 max-w-prose text-lg leading-8">
				Breylee Teeth Whitening Powder is formulated to help remove everyday stains caused by
				coffee, tea and smoking while leaving your mouth feeling fresh. With consistent use, many
				people notice a cleaner, brighter smile over time.
			</p>
		</div>
	</div>
</section>
