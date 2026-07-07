<script lang="ts">
	import { PRODUCT } from '$lib/features/order/constants/product';
	import { STATES } from '$lib/features/order/data/nigeriaStates';
	import { createEmptyOrder } from '$lib/features/order/factories/order';
	import { normalizeNigerianPhone } from '$lib/features/order/utils/phone';

	let order = $state(createEmptyOrder());

	let submitting = $state(false);
	let showConfirmation = $state(false);

	let errors = $state<Record<string, string>>({});

	const inputClass =
		'w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200';
	const labelClass = 'mb-2 block text-sm font-medium text-slate-700';

	const totalPrice = $derived(PRODUCT.unitPrice * order.product.quantity);

	function increaseQuantity() {
		order.product.quantity++;
	}
	function decreaseQuantity() {
		if (order.product.quantity > 1) {
			order.product.quantity--;
		}
	}

	function prepareForSubmit() {
		errors = {};

		order.customer.phone = normalizeNigerianPhone(order.customer.phone);

		showConfirmation = true;
	}
</script>

<form
	class="space-y-10 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
	onsubmit={(event) => {
		event.preventDefault();
		prepareForSubmit();
	}}
>
	<header class="border-b border-slate-200 pb-6">
		<h2 class="text-3xl font-bold text-slate-900">Place Your Order</h2>

		<p class="mt-2 text-slate-600">
			Fill in your details below and we'll contact you to confirm your order.
		</p>
	</header>

	<!-- CUSTOMER INFORMATION -->

	<fieldset class="space-y-6">
		<legend class="text-xl font-semibold text-slate-900"> Customer Information </legend>

		<div class="grid gap-6 md:grid-cols-2">
			<div>
				<label class={labelClass}> First Name </label>

				<input
					bind:value={order.customer.firstName}
					class={inputClass}
					type="text"
					autocomplete="given-name"
				/>

				{#if errors['customer.firstName']}
					<p class="mt-1 text-sm text-red-600">
						{errors['customer.firstName']}
					</p>
				{/if}
			</div>

			<div>
				<label class={labelClass}> Last Name </label>

				<input
					bind:value={order.customer.lastName}
					class={inputClass}
					type="text"
					autocomplete="family-name"
				/>

				{#if errors['customer.lastName']}
					<p class="mt-1 text-sm text-red-600">
						{errors['customer.lastName']}
					</p>
				{/if}
			</div>

			<div>
				<label class={labelClass}> Phone Number </label>

				<input
					bind:value={order.customer.phone}
					class={inputClass}
					type="tel"
					placeholder="08012345678"
					autocomplete="tel"
				/>

				{#if errors['customer.phone']}
					<p class="mt-1 text-sm text-red-600">
						{errors['customer.phone']}
					</p>
				{/if}
			</div>

			<div>
				<label class={labelClass}> Email Address </label>

				<input
					bind:value={order.customer.email}
					class={inputClass}
					type="email"
					autocomplete="email"
				/>

				{#if errors['customer.email']}
					<p class="mt-1 text-sm text-red-600">
						{errors['customer.email']}
					</p>
				{/if}
			</div>
		</div>
	</fieldset>

	<!-- ADDRESS -->

	<fieldset class="space-y-6">
		<legend class="text-xl font-semibold text-slate-900"> Delivery Address </legend>

		<div class="grid gap-6 md:grid-cols-2">
			<div>
				<label class={labelClass}> State </label>

				<select bind:value={order.address.state} class={inputClass}>
					<option value=""> Select State </option>

					{#each STATES as state (state)}
						<option value={state}>
							{state}
						</option>
					{/each}
				</select>
			</div>

			<div>
				<label class={labelClass}> LGA </label>

				<select bind:value={order.address.lga} class={inputClass}>
					<option value=""> Select LGA </option>
				</select>
			</div>

			<div class="md:col-span-2">
				<label class={labelClass}> Street Address </label>

				<input bind:value={order.address.streetAddress} class={inputClass} />
			</div>

			<div class="md:col-span-2">
				<label class={labelClass}> Nearest Landmark </label>

				<input bind:value={order.address.landmark} class={inputClass} />
			</div>

			<div class="md:col-span-2">
				<label class={labelClass}> Delivery Instructions </label>

				<textarea bind:value={order.address.deliveryNotes} rows="4" class={inputClass} />
			</div>
		</div>
	</fieldset>

	<!-- PRODUCT -->

	<fieldset class="space-y-6">
		<legend class="text-xl font-semibold text-slate-900"> Product </legend>

		<div class="rounded-xl border border-slate-200 p-6">
			<div class="flex items-start justify-between gap-4">
				<div>
					<h3 class="text-lg font-semibold">
						{PRODUCT.name}
					</h3>

					<p class="mt-1 text-slate-600">Unit Price</p>

					<p class="text-xl font-bold text-indigo-600">
						₦{PRODUCT.unitPrice.toLocaleString()}
					</p>
				</div>

				<div class="text-right">
					<label class="mb-2 block text-sm font-medium"> Quantity </label>

					<div class="inline-flex overflow-hidden rounded-lg border">
						<button type="button" class="px-4 py-2 hover:bg-slate-100" onclick={decreaseQuantity}>
							−
						</button>

						<div class="flex min-w-16 items-center justify-center border-x">
							{order.product.quantity}
						</div>

						<button type="button" class="px-4 py-2 hover:bg-slate-100" onclick={increaseQuantity}>
							+
						</button>
					</div>
				</div>
			</div>
		</div>
	</fieldset>
</form>
