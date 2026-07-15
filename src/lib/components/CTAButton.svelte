<script lang="ts">
	interface Props {
		href?: string;
		label: string;
	}

	let { href = '#order', label }: Props = $props();

	const isInPageAnchor = $derived(href.startsWith('#'));

	function handleClick(event: MouseEvent) {
		if (!isInPageAnchor) return;

		const target = document.querySelector<HTMLElement>(href);
		if (!target) return;

		event.preventDefault();

		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		target.scrollIntoView({
			behavior: prefersReducedMotion ? 'auto' : 'smooth',
			block: 'start'
		});

		// Keep the URL in sync without causing another jump
		history.replaceState(null, '', href);
	}
</script>

<a
	// eslint-disable-next-line svelte/no-navigation-without-resolve
	{href}
	class="inline-flex items-center justify-center rounded-full bg-green-600 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-green-700 active:scale-[0.98]"
	onclick={handleClick}
>
	{label}
</a>
