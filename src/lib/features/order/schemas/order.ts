import { z } from 'zod';

export const orderSchema = z.object({
  customer: z.object({
    firstName: z
      .string()
      .trim()
      .min(2, 'First name must be at least 2 characters.')
      .max(50),

    lastName: z
      .string()
      .trim()
      .min(2)
      .max(50),

    email: z
      .string()
      .trim()
      .toLowerCase()
      .email('Please enter a valid email address.'),

    phone: z
      .string()
      .trim()
  }),

  address: z.object({
    state: z.string().min(1, 'Please select a state.'),

    lga: z.string().min(1, 'Please select an LGA.'),

    city: z.string().trim().min(2),

    area: z.string().trim().min(2),

    streetAddress: z.string().trim().min(5),

    landmark: z.string().trim().optional(),

    deliveryNotes: z.string().trim().optional()
  }),

  product: z.object({
    quantity: z.number().int().min(1)
  })
});

export type Order = z.infer<typeof orderSchema>;
