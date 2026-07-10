import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { GOOGLE_SCRIPT_URL } from '$env/static/private';


export const POST: RequestHandler = async ({ request }) => {
  try {
    const payload = await request.json();

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      redirect: 'follow',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const text = await response.text();

    let result: {
      success: boolean;
      message: string;
    };

    try {
      result = JSON.parse(text);
    } catch {
      console.error('Expected JSON but received: ');
      console.error(text);

      return json(
        {
          success: false,
          message: 'Invald response from Google Script.'
        },
        {
          status: 502
        }
      );
    }

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
