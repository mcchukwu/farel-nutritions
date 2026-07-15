<script lang="ts">
	interface Props {
		href?: string;
		label: string;
	}
	let { href = '#order', label }: Props = $props();

	const isInPageAnchor = $derived(href?.startsWith('#') ?? false);

	function handleClick(event: MouseEvent) {
		if (!isInPageAnchor) return;

		const targetId = href.slice(1);
		if (!targetId) return;

		const target = document.getElementById(targetId);
		if (!target) return;

		event.preventDefault();

		const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

		target.scrollIntoView({
			behavior: motionQuery.matches ? 'auto' : 'smooth',
			block: 'start'
		});
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
