export function getFieldStateClass(
  disabled: boolean,
  invalid: boolean,
  focused: boolean,
): string {
  if (disabled)
    return 'cursor-not-allowed border-semantic-stroke-subtle bg-semantic-bg-deep';
  if (invalid)
    return 'border-semantic-feedback-error-normal bg-semantic-feedback-error-subtler';
  if (focused)
    return 'border-semantic-accent-normal ring-1 ring-semantic-accent-normal';
  return 'border-semantic-stroke-assistive bg-semantic-bg-standard hover:border-semantic-stroke-alternative';
}
