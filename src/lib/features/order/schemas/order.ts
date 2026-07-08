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
      .min(2, 'Last name must be at least 2 characters.')
      .max(50),

    email: z
      .email({
        message: "Please enter a valid email address."
      })
      .trim()
      .toLowerCase(),

    phone: z
      .string()
      .trim()
      .regex(
        /^\+234[789][01]\d{8}$/,
        "Please enter a valid Nigerian phone number."
      )

  }),

  address: z.object({
    state: z.string().min(1, 'Please select a state.'),

    lga: z.string().min(1, 'Please select an LGA.'),

    streetAddress: z.string().trim().min(5, 'Please enter a street address.'),

    landmark: z.string().trim().optional(),

    deliveryNotes: z.string().trim().optional()
  }),

  product: z.object({
    quantity: z.number().int().min(1)
  })
});

export type Order = z.infer<typeof orderSchema>;
