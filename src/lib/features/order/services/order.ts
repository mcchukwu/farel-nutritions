export interface SubmitOrderResponse {
  success: boolean;
  message: string;
}

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/REPLACE_WITH_YOUR_DEPLOYMENT_ID/exec';

export async function submitOrder(order: unknown): Promise<SubmitOrderResponse> {
  const response = await fetch(GOOGLE_SCRIPT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(order)
  });

  if (!response.ok) {
    throw new Error('Unable to submit order.');
  }

  return await response.json();
}
