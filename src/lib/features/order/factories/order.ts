import type { Order } from '$lib/features/order/types/order';

export function createEmptyOrder(): Order {
	return {
		customer: {
			firstName: '',
			lastName: '',
			email: '',
			phone: ''
		},
		address: {
			state: '',
			lga: '',
			streetAddress: '',
			landmark: '',
			deliveryNotes: ''
		},
		product: {
			quantity: 1
		}
	};
}
