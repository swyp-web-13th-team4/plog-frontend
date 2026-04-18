export function getSelectBoxClass({
  active,
  selected,
  disabled,
}: {
  active: boolean;
  selected: boolean;
  disabled: boolean;
}) {
  if (disabled)
    return 'cursor-not-allowed border border-semantic-stroke-subtle bg-semantic-bg-deep focus-visible:outline-semantic-stroke-subtle';
  if (active)
    return 'cursor-pointer border border-semantic-accent-normal focus-visible:outline-semantic-accent-subtle';
  if (selected)
    return 'cursor-pointer border border-semantic-stroke-subtle focus-visible:outline-semantic-stroke-subtle';

  return 'cursor-pointer border border-semantic-stroke-subtle focus-visible:outline-semantic-stroke-subtle';
}

export function getDropDownItemStateClass({
  hover,
  active,
  selected,
}: {
  hover: boolean;
  active: boolean;
  selected: boolean;
}) {
  if (hover)
    return 'cursor-pointer bg-semantic-bg-deep text-semantic-object-bold ';
  if (active)
    return 'cursor-pointer bg-semantic-bg-standard text-semantic-accent-normal';
  if (selected)
    return 'cursor-pointer bg-semantic-bg-standard text-semantic-accent-normal';
  return 'cursor-pointer bg-semantic-bg-standard text-semantic-object-bold';
}

export function getDropDownItemFocusClass({
  active,
  selected,
  disabled,
}: {
  active: boolean;
  selected: boolean;
  disabled: boolean;
}) {
  if (disabled) return 'focus-visible:outline-semantic-stroke-subtle';
  if (active || selected) return 'focus-visible:outline-semantic-accent-subtle';
  return 'focus-visible:outline-semantic-stroke-subtle';
}

export function getSelectValueStateClass({
  placeholder,
}: {
  placeholder: boolean;
}) {
  if (placeholder) return 'text-semantic-object-normal';
  return 'text-semantic-object-bold';
}
