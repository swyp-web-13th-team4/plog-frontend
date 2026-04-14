import type { Checkbox } from '@base-ui/react';

type CheckboxState = Pick<
  Checkbox.Root.State,
  'checked' | 'indeterminate' | 'disabled'
>;

export function getCheckboxRootClass(state: CheckboxState) {
  const isSelected = state.checked || state.indeterminate;
  const focusVisibleClass = isSelected
    ? 'focus-visible:outline-semantic-accent-subtle'
    : 'focus-visible:outline-semantic-stroke-subtle';

  if (state.disabled && isSelected) {
    return 'cursor-not-allowed border-semantic-object-subtle bg-semantic-object-subtle text-semantic-object-inverse';
  }

  if (state.disabled) {
    return 'cursor-not-allowed border-semantic-stroke-subtle bg-semantic-bg-deep text-semantic-object-subtle';
  }

  if (isSelected) {
    return `border-semantic-accent-normal bg-semantic-accent-normal text-semantic-object-inverse ${focusVisibleClass}`;
  }

  return `border-semantic-stroke-assistive bg-semantic-system-white text-semantic-object-inverse hover:border-semantic-accent-normal ${focusVisibleClass}`;
}
