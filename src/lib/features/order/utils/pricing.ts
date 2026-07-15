export const UNIT_PRICE = 14000;

const DISCOUNTS: Record<number, number> = {
  1: 0,
  2: 2000,
  3: 5000,
  4: 8000
};

export function calculatePricing(quantity: number) {
  const subtotal = quantity * UNIT_PRICE;

  const discount =
    DISCOUNTS[quantity] ??
    (quantity > 4 ? 8000 + (quantity - 4) * 3000 : 0);

  return {
    unitPrice: UNIT_PRICE,
    subtotal,
    discount,
    total: subtotal - discount
  };
}
