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

  if (!response.ok) {
    return new Response(null, { status: response.status });
  }

  return new Response(response.body, {
    status: 200,
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}
