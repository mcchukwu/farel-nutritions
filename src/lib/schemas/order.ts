import { z } from 'zod';

export const orderSchema = z.object({
  customer: z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    phone: z.string()
  }),

  address: z.object({
    state: z.string(),
    lga: z.string(),
    streetAddress: z.string(),
    landmark: z.string(),
    deliveryNotes: z.string()
  }),

  product: z.object({
    quantity: z.number()
  })
});
