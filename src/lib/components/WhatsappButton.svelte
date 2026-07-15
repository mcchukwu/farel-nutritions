<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	const whatsappUrl =
		'https://wa.me/2348070973712?text=Hi%20Farel%20Nutritions%2C%20I%27d%20like%20to%20know%20more%20about%20the%20BREYLEE%20Teeth%20Whitening%20Powder.';

	let showBubble = $state(false);

	onMount(() => {
		const showTimer = setTimeout(() => {
			showBubble = true;
		}, 5000);

		const hideTimer = setTimeout(() => {
			showBubble = false;
		}, 16000);

		return () => {
			clearTimeout(showTimer);
			clearTimeout(hideTimer);
		};
	});
</script>

{#if showBubble}
	<div
		in:fly={{ y: 40, duration: 300 }}
		out:fly={{ y: 20, duration: 200 }}
		class="fixed bottom-28 right-6 z-50 max-w-xs rounded-xl bg-white p-4 text-sm shadow-xl ring-1 ring-slate-200"
	>
		<button
			type="button"
			class="absolute right-2 top-2 text-slate-400 hover:text-slate-600"
			onclick={() => (showBubble = false)}
			aria-label="Close"
		>
			✕
		</button>

		<p class="pr-5 font-medium text-slate-800">👋 Have questions before ordering?</p>

		<p class="mt-1 text-slate-600">Chat with us on WhatsApp. We're happy to help.</p>
	</div>
{/if}

<a
	href={whatsappUrl}
	target="_blank"
	rel="noopener noreferrer"
	aria-label="Chat with us on WhatsApp"
	class="fixed bottom-8 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] shadow-xl transition duration-200 hover:scale-110 active:scale-95"
>
	<svg viewBox="0 0 32 32" fill="white" class="h-9 w-9">
		<path
			d="M16.01 3C8.83 3 3 8.82 3 16c0 2.54.74 4.99 2.14 7.1L3 29l6.07-2.09A12.9 12.9 0 0016.01 29C23.18 29 29 23.18 29 16S23.18 3 16.01 3zm0 23.69a10.7 10.7 0 01-5.45-1.49l-.39-.23-3.6 1.24 1.18-3.51-.25-.41A10.66 10.66 0 0116.01 5.31c5.89 0 10.69 4.8 10.69 10.69s-4.8 10.69-10.69 10.69zm5.86-8.01c-.32-.16-1.9-.94-2.2-1.05-.29-.11-.5-.16-.71.16-.21.32-.82 1.05-1.01 1.27-.18.21-.37.24-.69.08-.32-.16-1.34-.49-2.55-1.57-.94-.84-1.57-1.88-1.76-2.2-.18-.32-.02-.49.14-.65.14-.14.32-.37.48-.55.16-.18.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.71-1.71-.97-2.35-.26-.62-.53-.53-.71-.54h-.61c-.21 0-.56.08-.85.4-.29.32-1.12 1.09-1.12 2.66s1.15 3.08 1.31 3.29c.16.21 2.27 3.46 5.49 4.85.77.34 1.37.54 1.84.69.77.25 1.47.21 2.02.13.62-.09 1.9-.78 2.17-1.54.27-.76.27-1.41.19-1.54-.08-.13-.29-.21-.61-.37z"
		/>
	</svg>
</a>
