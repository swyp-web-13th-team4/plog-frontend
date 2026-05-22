import { type NextRequest } from 'next/server';

const SERVER_URL = (process.env.NEXT_PUBLIC_SERVER_URL ?? '').replace(
  /\/$/,
  '',
);

export async function GET(request: NextRequest) {
  const cookie = request.headers.get('cookie') ?? '';

  const response = await fetch(`${SERVER_URL}/api/notification/subscribe`, {
    headers: {
      Cookie: cookie,
      Accept: 'text/event-stream',
      'Cache-Control': 'no-cache',
    },
  });

  return new Response(response.body, {
    status: response.status,
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}
