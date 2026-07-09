<script lang="ts">
	import { PRODUCT } from '$lib/features/order/constants/product';
	import { createEmptyOrder } from '$lib/features/order/factories/order';
	import { orderSchema } from '../schemas/order';
	import { submitOrder } from '../services/order';
	import { normalizeNigerianPhone } from '../utils/phone';
	import nigeria from '$lib/features/order/data/nigeria.json';
	import type { NigerianState } from '$lib/features/order/types/nigeria';
	import { fade, scale } from 'svelte/transition';
	import { tick } from 'svelte';

	let order = $state(createEmptyOrder());

	let isSubmitting = $state(false);
	let showConfirmation = $state(false);
	let orderSuccessful = $state(false);
	let submissionError = $state('');

	let errors = $state<Record<string, string>>({});
	/* Maps the field names in the order schema to the IDs of the corresponding form fields */
	const fieldMap: Record<string, string> = {
		'customer.firstName': 'firstName',
		'customer.lastName': 'lastName',
		'customer.email': 'email',
		'customer.phone': 'phone',

		'address.state': 'state',
		'address.lga': 'lga',
		'address.streetAddress': 'streetAddress',
		'address.landmark': 'landmark',
		'address.deliveryNotes': 'deliveryNotes'
	};

	/* Reusable CSS classes */
	const inputClass =
		'w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-green-50';
	const labelClass = 'mb-2 block text-sm font-medium text-slate-700';

	const states = nigeria as NigerianState[];
	const stateNames = $derived(states.map((state) => state.state));
	const selectedState = $derived(states.find((state) => state.state === order.address.state));
	const availableLgas = $derived(selectedState?.lgas ?? []);

	/* Reset the lga field when the state changes */
	let previousState = '';
	$effect(() => {
		if (order.address.state && order.address.state !== previousState) {
			order.address.lga = '';
			previousState = order.address.state;
		}
	});

	const totalPrice = $derived(PRODUCT.unitPrice * order.product.quantity);

	/* IncreaseQuantity increases the quantity of the order by 1 */
	function increaseQuantity() {
		order.product.quantity++;
	}

	/* DecreaseQuantity decreases the quantity of the order by 1 */
	function decreaseQuantity() {
		if (order.product.quantity > 1) {
			order.product.quantity--;
		}
	}

	/* PrepareForSubmit prepares the order for submission
  and sets the showConfirmation state to true, if there are no errors. */
	async function prepareForSubmit() {
		errors = {};

		const result = orderSchema.safeParse(order);

		if (!result.success) {
			for (const issue of result.error.issues) {
				errors[issue.path.join('.')] = issue.message;
			}

			await tick();

			const firstError = Object.keys(errors)[0];

			if (firstError) {
				const id = fieldMap[firstError];

				if (id) {
					const element = document.getElementById(id);

					element?.scrollIntoView({
						behavior: 'smooth',
						block: 'center'
					});

					element?.focus();
				}
			}

			return;
		}

		showConfirmation = true;
	}

	/* SubmitOrder submits the order to the Google Script */
	async function placeOrder() {
		if (isSubmitting) return;

		isSubmitting = true;

		try {
			const payload = {
				...order,

				customer: {
					...order.customer,

					phone: normalizeNigerianPhone(order.customer.phone)
				}
			};

			const result = await submitOrder(payload);

			if (!result.success) {
				throw new Error(result.message);
			}

			order = createEmptyOrder();

			showConfirmation = false;

			orderSuccessful = true;
		} catch (error) {
			showConfirmation = false;

			submissionError = 'Unable to submit your order. Please try again.';

			console.error(error);
		} finally {
			isSubmitting = false;
		}
	}
</script>

{#if orderSuccessful}
	<section
		in:scale={{ duration: 250 }}
		out:fade
		class="rounded-2xl border border-green-300 bg-green-50 p-10 text-center"
	>
		<div class="mx-auto max-w-lg">
			<h2 class="text-3xl font-bold text-green-700">Order Received 🎉</h2>

			<p class="mt-4 text-slate-700">
				Thank you. We've received your order. We'll contact you shortly to confirm it.
			</p>

			<button
				class="mt-8 rounded-full bg-green-600 px-6 py-3 font-semibold text-white"
				onclick={() => {
					orderSuccessful = false;
				}}
			>
				Place Another Order
			</button>
		</div>
	</section>
{:else}
	<form
		class="space-y-10 rounded-2xl border border-slate-200 bg-white px-4 py-6 shadow-sm"
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
					<label class={labelClass} for="firstName"> First Name </label>

					<input
						id="firstName"
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
					<label class={labelClass} for="lastName"> Last Name </label>

					<input
						id="lastName"
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
					<label class={labelClass} for="phone"> Phone Number </label>

					<input
						id="phone"
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
					<label class={labelClass} for="email"> Email (optional)</label>

					<input
						id="email"
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
					<label class={labelClass} for="state"> State </label>

					<select id="state" bind:value={order.address.state} class={inputClass}>
						<option value=""> Select State </option>

						{#each stateNames as state (state)}
							<option value={state}>
								{state}
							</option>
						{/each}
					</select>

					{#if errors['address.state']}
						<p class="mt-1 text-sm text-red-600">
							{errors['address.state']}
						</p>
					{/if}
				</div>

				<div>
					<label class={labelClass} for="lga"> LGA </label>

					<select
						id="lga"
						bind:value={order.address.lga}
						class={inputClass}
						disabled={!order.address.state}
					>
						<option value="">
							{order.address.state ? 'Select LGA' : 'Select a state first'}
						</option>

						{#each availableLgas as lga (lga)}
							<option value={lga}>
								{lga}
							</option>
						{/each}
					</select>

					{#if errors['address.lga']}
						<p class="mt-1 text-sm text-red-600">
							{errors['address.lga']}
						</p>
					{/if}
				</div>

				<div class="md:col-span-2">
					<label class={labelClass} for="streetAddress"> Street Address </label>

					<input id="streetAddress" bind:value={order.address.streetAddress} class={inputClass} />

					{#if errors['address.streetAddress']}
						<p class="mt-1 text-sm text-red-600">
							{errors['address.streetAddress']}
						</p>
					{/if}
				</div>

				<div class="md:col-span-2">
					<label class={labelClass} for="landmark"> Nearest Landmark (optional) </label>

					<input id="landmark" bind:value={order.address.landmark} class={inputClass} />
				</div>

				<div class="md:col-span-2">
					<label class={labelClass} for="deliveryNotes"> Delivery Instructions (optional) </label>

					<textarea
						id="deliveryNotes"
						bind:value={order.address.deliveryNotes}
						rows="4"
						class={`${inputClass} resize-none`}></textarea>
				</div>
			</div>
		</fieldset>

		<!-- PRODUCT -->

		<fieldset class="space-y-6">
			<legend class="text-xl font-semibold text-slate-900"> Product </legend>

			<div class="rounded-xl border border-slate-200 py-6 px-4">
				<div class="">
					<div>
						<h3 class="text-lg font-semibold mb-4">
							{PRODUCT.name}
						</h3>
					</div>

					<div>
						<label class="mb-2 block text-sm font-medium" for="productQuantity"> Quantity </label>

						<div class="inline-flex overflow-hidden flex-wrap rounded-lg border">
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

				<hr class="my-6" />

				<div class="space-y-3">
					<div class="flex justify-between flex-wrap">
						<span>Quantity</span>

						<strong>
							{order.product.quantity}
						</strong>
					</div>

					<div class="flex justify-between flex-wrap">
						<span>Unit Price</span>

						<strong>
							₦{PRODUCT.unitPrice.toLocaleString()}
						</strong>
					</div>

					<div class="flex justify-between flex-wrap border-t pt-4 text-lg font-bold">
						<span>Total</span>

						<span>
							₦{totalPrice.toLocaleString()}
						</span>
					</div>
				</div>
			</div>
		</fieldset>

		{#if submissionError}
			<div class="rounded-lg border border-red-300 bg-red-50 p-4 text-red-700">
				{submissionError}
			</div>
		{/if}

		<div class="flex justify-end">
			<button
				type="submit"
				disabled={isSubmitting}
				class="rounded-full bg-green-600 px-8 py-4 w-full font-semibold text-white transition hover:bg-green-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
			>
				{isSubmitting ? 'Submitting...' : 'Place Order'}
			</button>
		</div>
	</form>
	{#if showConfirmation}
		<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
			<div class="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
				<h3 class="text-2xl font-bold">Confirm Order</h3>

				<p class="mt-4">
					You are about to order

					<strong>
						{order.product.quantity}
					</strong>

					unit(s) of

					<strong>
						{PRODUCT.name}
					</strong>

					for

					<strong>
						₦{totalPrice.toLocaleString()}
					</strong>
				</p>

				<div class="mt-8 flex flex-col-reverse md:flex-row gap-2 w-full">
					<button
						type="button"
						class="rounded-full border w-full px-5 py-3"
						onclick={() => {
							showConfirmation = false;
						}}
					>
						Cancel
					</button>

					<button
						type="button"
						class="rounded-full w-full bg-green-600 px-5 py-3 text-white"
						disabled={isSubmitting}
						onclick={placeOrder}
					>
						{isSubmitting ? 'Submitting...' : 'Confirm Order'}
					</button>
				</div>
			</div>
		</div>
	{/if}
{/if}
