export function getFieldStateClass(
  disabled: boolean,
  invalid: boolean,
  focused: boolean,
): string {
  if (disabled)
    return 'cursor-not-allowed border-semantic-stroke-subtle bg-semantic-bg-deep';
  if (invalid)
    return 'border-semantic-theme-red-normal bg-semantic-theme-red-subtler';
  if (focused)
    return 'border-semantic-accent-normal ring-1 ring-semantic-accent-normal bg-semantic-object-inverse';
  return 'border-semantic-stroke-subtle bg-semantic-object-inverse hover:border-semantic-stroke-alternative';
}
