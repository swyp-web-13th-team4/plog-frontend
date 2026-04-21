import {
  type ComponentPropsWithoutRef,
  type ComponentRef,
  type Ref,
} from 'react';

import { Select as BaseSelect } from '@base-ui/react/select';
import { cn } from '@plog/utils';

import ArrowIcon from '@/assets/arrow.svg?react';

import {
  getDropDownItemFocusClass,
  getDropDownItemStateClass,
  getSelectBoxClass,
  getSelectValueStateClass,
} from './getSelectStateClass';
import { type SelectOption } from './Select.types';

type SelectProps = Omit<
  ComponentPropsWithoutRef<typeof BaseSelect.Root>,
  'children' | 'items'
> & {
  options: SelectOption[];
  placeholder?: string;
  className?: string;
  contentClassName?: string;
  optionClassName?: string;
  ref?: Ref<ComponentRef<typeof BaseSelect.Trigger>>;
} & (
    | { 'aria-label'?: string; 'aria-labelledby'?: never }
    | { 'aria-label'?: never; 'aria-labelledby'?: string }
  );

const triggerClassName =
  'label-sm inline-flex h-9 w-26 items-center gap-2 justify-between rounded-xl px-3 text-left transition-colors disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-1';

const iconClassName =
  'shrink-0 transition-transform data-[popup-open]:rotate-180';

const popupClassName =
  'overflow-hidden rounded-xl border border-semantic-stroke-subtle bg-semantic-system-white p-1.5 focus-within:outline-2 focus-within:outline-offset-1 focus-within:outline-semantic-stroke-subtle';

const itemClassName =
  'label-sm flex min-h-[30px] w-23 items-center justify-between rounded-md px-1.5 py-1 transition-colors focus-visible:outline-2 focus-visible:outline-offset-1';

function Select({
  ref,
  options,
  placeholder = '선택하세요',
  className,
  contentClassName,
  optionClassName,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  ...props
}: SelectProps) {
  return (
    <BaseSelect.Root {...props}>
      <BaseSelect.Trigger
        ref={ref}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        className={(state) =>
          cn(
            triggerClassName,
            getSelectBoxClass({
              active: state.open,
              disabled: state.disabled,
            }),
            state.disabled
              ? 'text-semantic-object-subtle'
              : 'text-semantic-object-normal',
            className,
          )
        }
      >
        <BaseSelect.Value
          placeholder={placeholder}
          className={(state) =>
            cn(
              'min-w-0 flex-1 truncate',
              getSelectValueStateClass({
                placeholder: state.placeholder,
                disabled: !!props.disabled,
              }),
            )
          }
        />

        <BaseSelect.Icon className={iconClassName}>
          <ArrowIcon />
        </BaseSelect.Icon>
      </BaseSelect.Trigger>

      <BaseSelect.Portal>
        <BaseSelect.Positioner sideOffset={8} alignItemWithTrigger={false}>
          <BaseSelect.Popup className={cn(popupClassName, contentClassName)}>
            <BaseSelect.List className="flex flex-col gap-2">
              {options.map((option) => (
                <BaseSelect.Item
                  key={option.value}
                  value={option.value}
                  className={(state) =>
                    cn(
                      itemClassName,
                      getDropDownItemStateClass({
                        hover: state.highlighted && !state.selected,
                        selected: state.selected,
                      }),
                      state.selected
                        ? 'bg-semantic-bg-deeper hover:text-semantic-accent-normal'
                        : 'hover:bg-semantic-bg-deep hover:text-semantic-object-bold',
                      getDropDownItemFocusClass({
                        selected: state.selected,
                      }),
                      optionClassName,
                    )
                  }
                >
                  <BaseSelect.ItemText className="flex-1 truncate">
                    {option.label}
                  </BaseSelect.ItemText>
                </BaseSelect.Item>
              ))}
            </BaseSelect.List>
          </BaseSelect.Popup>
        </BaseSelect.Positioner>
      </BaseSelect.Portal>
    </BaseSelect.Root>
  );
}

export default Select;
