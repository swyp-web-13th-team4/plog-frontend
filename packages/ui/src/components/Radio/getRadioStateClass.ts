import type { Radio } from '@base-ui/react';

type RadioState = Pick<Radio.Root.State, 'checked' | 'disabled'>;

export function getRadioStateClass(state: RadioState) {
  const isSelected = state.checked;

  if (state.disabled && isSelected) {
    return 'pointer-events-none border-semantic-object-subtle bg-semantic-object-subtle text-semantic-object-inverse';
  }

  if (state.disabled) {
    return 'pointer-events-none border-semantic-stroke-subtle bg-semantic-bg-deep text-semantic-object-subtle';
  }

  const focusVisibleClass = isSelected
    ? 'focus-visible:outline-semantic-accent-subtle'
    : 'focus-visible:outline-semantic-stroke-subtle';

  if (isSelected) {
    return `cursor-pointer border-semantic-accent-normal bg-semantic-accent-normal text-semantic-object-inverse ${focusVisibleClass}`;
  }

  return `cursor-pointer border-semantic-stroke-assistive bg-semantic-system-white hover:border-semantic-accent-normal ${focusVisibleClass}`;
}
