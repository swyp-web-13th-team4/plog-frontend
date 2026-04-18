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
    return 'cursor-not-allowed border border-semantic-stroke-subtle bg-semantic-bg-deep';
  if (active) return 'cursor-pointer border border-semantic-accent-normal';
  if (selected) return 'cursor-pointer border border-semantic-stroke-subtle';

  return 'cursor-pointer border border-semantic-stroke-subtle';
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

export function getSelectValueStateClass({
  placeholder,
  disabled,
}: {
  placeholder: boolean;
  disabled: boolean;
}) {
  if (disabled) return 'text-semantic-object-subtle';
  if (placeholder) return 'text-semantic-object-normal';
  return 'text-semantic-object-bold';
}
