<script lang="ts">
	import type { ClassValue } from 'svelte/elements';

	interface Props {
		size?: string;
		class?: ClassValue;
	}

	let { size = 'h-5 w-5', class: className }: Props = $props();
</script>

<div
	class={[
		'animate-spin rounded-full border-3 border-current border-t-transparent',
		size,
		className
	]}
></div>
