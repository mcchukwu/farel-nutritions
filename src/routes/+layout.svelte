<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Header from '$lib/components/Header.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<title>Farel Nutritions</title>
	<link rel="icon" href={favicon} />
</svelte:head>
<Header />
{@render children()}
