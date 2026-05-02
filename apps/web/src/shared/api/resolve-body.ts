export function resolveBody(
  body?: unknown,
): Pick<RequestInit, 'body' | 'headers'> {
  if (body instanceof FormData) return { body };
  if (body !== undefined)
    return {
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    };
  return {};
}
