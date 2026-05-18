import { type Ref } from 'react';

import { Menu as BaseMenu } from '@base-ui/react/menu';
import { cn } from '@plog/utils';

import { type DropdownProps } from './Dropdown.types';

const triggerBaseClassName =
  'inline-flex size-8 cursor-pointer items-center justify-center rounded-md transition-colors hover:bg-semantic-bg-deep disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-semantic-stroke-subtle';

const popupBaseClassName =
  'overflow-hidden rounded-xl border border-semantic-stroke-subtle bg-semantic-system-white p-1.5';

const itemBaseClassName =
  'label-sm flex min-h-[30px] w-23 cursor-pointer items-center rounded-md px-1.5 py-1 transition-colors hover:bg-semantic-bg-deep hover:text-semantic-object-bold focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-semantic-stroke-subtle data-[highlighted]:bg-semantic-bg-deep data-[highlighted]:text-semantic-object-bold data-[disabled]:cursor-not-allowed data-[disabled]:text-semantic-object-subtle data-[disabled]:hover:bg-transparent';

function Dropdown({
  items,
  trigger,
  onSelect,
  disabled,
  className,
  triggerClassName,
  positionerClassName,
  contentClassName,
  itemClassName,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  ref,
}: DropdownProps & {
  ref?: Ref<HTMLButtonElement>;
}) {
  return (
    <BaseMenu.Root disabled={disabled}>
      <BaseMenu.Trigger
        ref={ref}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        className={cn(triggerBaseClassName, triggerClassName, className)}
      >
        {trigger}
      </BaseMenu.Trigger>

      <BaseMenu.Portal>
        <BaseMenu.Positioner
          sideOffset={8}
          align="end"
          className={cn('z-30', positionerClassName)}
        >
          <BaseMenu.Popup className={cn(popupBaseClassName, contentClassName)}>
            <BaseMenu.Group className="flex flex-col gap-2">
              {items.map((item) => (
                <BaseMenu.Item
                  key={item.value}
                  disabled={item.disabled}
                  label={item.label}
                  className={cn(itemBaseClassName, itemClassName)}
                  onClick={() => onSelect(item.value)}
                >
                  <span className="flex-1 truncate">{item.label}</span>
                </BaseMenu.Item>
              ))}
            </BaseMenu.Group>
          </BaseMenu.Popup>
        </BaseMenu.Positioner>
      </BaseMenu.Portal>
    </BaseMenu.Root>
  );
}

export default Dropdown;
