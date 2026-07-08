export interface SubmitOrderResponse {
  success: boolean;
  message: string;
}

export async function submitOrder(order: unknown): Promise<SubmitOrderResponse> {
  const response = await fetch('/api/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(order)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}
