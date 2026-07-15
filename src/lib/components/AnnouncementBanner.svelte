<script lang="ts">
	let visible = $state(true);

	function close() {
		visible = false;
	}
</script>

{#if visible}
	<div class="sticky top-0 z-50 bg-green-600 text-white shadow">
		<div
			class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 text-sm font-medium"
		>
			<p class="text-center flex-1">
				🎉 Save More When You Buy 2+ Packs • 🚚 Pay on Delivery Nationwide
			</p>

			<button
				type="button"
				onclick={close}
				class="text-lg leading-none opacity-80 transition hover:opacity-100"
				aria-label="Close announcement"
			>
				✕
			</button>
		</div>
	</div>
{/if}
