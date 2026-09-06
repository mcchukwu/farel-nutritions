<script lang="ts">
	import FareLogo from '$lib/assets/farelogo.svg?enhanced';
	import { resolve } from '$app/paths';
</script>

<header>
	<div class="mx-auto max-w-7xl px-6">
		<div class="py-6">
			<a href={resolve('/')} class="flex items-center" aria-label="Go to Homepage">
				<enhanced:img src={FareLogo} alt="Farel Logo" class="h-8 w-auto object-contain md:h-10" />
			</a>
		</div>
	</div>
</header>
