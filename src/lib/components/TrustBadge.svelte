<script lang="ts">
	interface Props {
		text: string;
	}

	let { text }: Props = $props();
</script>

<div
	class="flex items-center gap-2 rounded-xl border border-green-100 bg-white px-4 py-2 shadow-sm"
>
	<div class="h-2 w-2 rounded-full bg-green-500"></div>

	<span class="text-sm font-medium text-slate-700">
		{text}
	</span>
</div>
