export function mergeAriaIds(
  ...values: (string | undefined)[]
): string | undefined {
  const ids = values.flatMap(
    (value) => value?.split(/\s+/).filter(Boolean) ?? [],
  );
  return ids.length > 0 ? Array.from(new Set(ids)).join(' ') : undefined;
}
