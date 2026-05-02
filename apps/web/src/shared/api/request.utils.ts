export function mergeHeaders(...sources: (HeadersInit | undefined)[]): Headers {
  const result = new Headers();
  for (const source of sources) {
    if (!source) continue;
    new Headers(source).forEach((value, key) => result.set(key, value));
  }
  return result;
}

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
