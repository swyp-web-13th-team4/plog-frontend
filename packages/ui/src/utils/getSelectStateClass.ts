export function getSelectBoxClass({
  active,
  disabled,
}: {
  active: boolean;
  disabled: boolean;
}) {
  if (disabled)
    return 'cursor-not-allowed border border-semantic-stroke-subtle bg-semantic-bg-deep focus-visible:outline-semantic-stroke-subtle';
  if (active)
    return 'cursor-pointer border border-semantic-accent-normal focus-visible:outline-semantic-accent-subtle';

  return 'cursor-pointer border border-semantic-stroke-subtle focus-visible:outline-semantic-stroke-subtle';
}

export function getDropDownItemStateClass({
  hover,
  selected,
}: {
  hover: boolean;
  selected: boolean;
}) {
  if (selected) return 'cursor-pointer text-semantic-accent-normal';
  if (hover)
    return 'cursor-pointer bg-semantic-bg-deep text-semantic-object-bold';
  return 'cursor-pointer bg-semantic-bg-standard text-semantic-object-bold';
}

export function getDropDownItemFocusClass({ selected }: { selected: boolean }) {
  if (selected) return 'focus-visible:outline-semantic-accent-subtle';
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
