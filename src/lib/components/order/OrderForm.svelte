<script lang="ts">
	import { PRODUCT } from '$lib/constants/product';
	import { createEmptyOrder } from '$lib/factories/order';

	let order = $state(createEmptyOrder());

	let totalPrice = $derived(PRODUCT.unitPrice * order.product.quantity);
</script>

<form class="space-y-10">
	<section>
		<h2 class="text-xl font-semibold">Customer Information</h2>

		<div class="grid gap-4 mt-4">
			<input
				bind:value={order.customer.firstName}
				placeholder="First name"
				class="border rounded-lg p-3"
			/>

			<input
				bind:value={order.customer.lastName}
				placeholder="Last name"
				class="border rounded-lg p-3"
			/>

			<input bind:value={order.customer.email} placeholder="Email" class="border rounded-lg p-3" />

			<input bind:value={order.customer.phone} placeholder="Phone" class="border rounded-lg p-3" />
		</div>
	</section>

	<section>
		<h2 class="text-xl font-semibold">Product</h2>

		<p>{PRODUCT.name}</p>

		<p>
			₦{PRODUCT.unitPrice.toLocaleString()}
		</p>

		<div class="flex items-center gap-3">
			<button
				type="button"
				onclick={() => {
					if (order.product.quantity > 1) order.product.quantity--;
				}}
			>
				-
			</button>

			<span>
				{order.product.quantity}
			</span>

			<button
				type="button"
				onclick={() => {
					order.product.quantity++;
				}}
			>
				+
			</button>
		</div>

		<p>
			Total:

			<strong>
				₦{totalPrice.toLocaleString()}
			</strong>
		</p>
	</section>
</form>
