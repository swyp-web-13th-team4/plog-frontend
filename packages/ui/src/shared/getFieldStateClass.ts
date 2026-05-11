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
    return 'border-semantic-accent-normal ring-1 ring-semantic-accent-normal bg-semantic-system-white';
  return 'border-semantic-stroke-subtle bg-semantic-system-white hover:border-semantic-stroke-alternative';
}
