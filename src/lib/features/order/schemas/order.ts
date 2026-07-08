import { z } from 'zod';

const nameField = (label: string) =>
  z
    .string()
    .trim()
    .min(2, `${label} must be at least 2 characters.`)
    .max(50, `${label} must be at most 50 characters.`)
    .regex(/^[a-zA-Z' -]+$/, `${label} can only contain letters, spaces, apostrophes and hyphens.`);

export const orderSchema = z.object({
  customer: z.object({
    firstName: nameField('First name'),
    lastName: nameField('Last name'),
    email: z
      .string()
      .transform((value) => value.trim().toLowerCase())
      .pipe(z.email({ message: 'Please enter a valid email address.' })),
    phone: z
      .string()
      .transform((val) => val.replace(/\D/g, ''))
      .pipe(
        z
          .string()
          .regex(/^(?:234|0)\d{10}$/, {
            message: 'Enter a valid Nigerian phone number (11 digits starting with 0, or with country code 234).',
          })
      )
      // normalize to a single canonical format: 0XXXXXXXXXX
      .transform((val) => (val.startsWith('234') ? '0' + val.slice(3) : val)),
  }),
  address: z.object({
    state: z.string().min(1, 'Please select a state.'),
    lga: z.string().min(1, 'Please select an LGA.'),
    streetAddress: z.string().trim().min(5, 'Please enter a street address.'),
    landmark: z.string().trim().max(100).optional(),
    deliveryNotes: z.string().trim().max(500).optional(),
  }),
  product: z.object({
    quantity: z.number().int().min(1, 'Quantity must be at least 1.').max(999, 'Quantity is too large.'),
  }),
});

export type Order = z.infer<typeof orderSchema>;
