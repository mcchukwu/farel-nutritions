<script lang="ts">
	import Image01 from '$lib/assets/images/product/01-MPImage.webp';
	import Image03 from '$lib/assets/images/product/03-MPImage.webp';
	import Image04 from '$lib/assets/images/product/04-MPImage.webp';
	import Image05 from '$lib/assets/images/product/05-MPImage.webp';
	import Image06 from '$lib/assets/images/product/06-MPImage.webp';
	import Image07 from '$lib/assets/images/product/07-MPImage.webp';
	import Image08 from '$lib/assets/images/product/08-MPImage.webp';
	import Image09 from '$lib/assets/images/product/09-MPImage.webp';

	const images = [
		{ src: Image01, alt: 'BREYLEE Teeth Whitening Powder' },
		{ src: Image03, alt: 'Information' },
		{ src: Image04, alt: 'selected powder from deep sea' },
		{ src: Image05, alt: 'cleaning teeth without damage' },
		{ src: Image06, alt: 'Cleaning experiment' },
		{ src: Image07, alt: 'Why choose us' },
		{ src: Image08, alt: 'Natural extract' },
		{ src: Image09, alt: 'How to use' }
	];
</script>

<section>
	<div class="mx-auto max-w-3xl py-10">
		{#each images as image (image.alt)}
			<enhanced:img
				src={image.src}
				alt={image.alt}
				class="block h-auto w-full object-contain"
				sizes="(max-width: 768px) 100vw, 768px"
			/>
		{/each}
	</div>
</section>
