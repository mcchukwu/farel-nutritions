import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { PUBLIC_GOOGLE_SCRIPT_URL } from '$env/static/public';


export const POST: RequestHandler = async ({ request }) => {
  try {
    const payload = await request.json();

    const response = await fetch(PUBLIC_GOOGLE_SCRIPT_URL, {
      method: 'POST',
      redirect: 'follow',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    return json(result, {
      status: result.success ? 200 : 400
    });
  } catch (error) {
    console.error(error);

    return json(
      {
        success: false,
        message: 'Unable to submit order.'
      },
      {
        status: 500
      }
    );
  }
};
