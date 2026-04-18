import {
  type ComponentPropsWithoutRef,
  type ComponentRef,
  forwardRef,
} from 'react';

import { Select as BaseSelect } from '@base-ui/react/select';
import { cn } from '@plog/utils';

import ArrowIcon from '@/assets/arrow.svg?react';
import {
  getDropDownItemFocusClass,
  getDropDownItemStateClass,
  getSelectBoxClass,
  getSelectValueStateClass,
} from '@/utils/getSelectStateClass';

type SelectOption = {
  label: string;
  value: string;
};

type SelectProps = Omit<
  ComponentPropsWithoutRef<typeof BaseSelect.Root>,
  'children' | 'items'
> & {
  options: SelectOption[];
  placeholder?: string;
  ariaLabel?: string;
  className?: string;
  contentClassName?: string;
  optionClassName?: string;
};

const triggerClassName =
  'label-sm inline-flex h-9 min-w-[104px] items-center gap-2 justify-between rounded-[12px] px-3 text-left transition-colors disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-1';

const iconClassName =
  'shrink-0 transition-transform data-[popup-open]:rotate-180 [&_svg]:size-4';

const popupClassName =
  'overflow-hidden rounded-[12px] border border-semantic-stroke-subtle bg-semantic-system-white p-1.5 focus-within:outline-2 focus-within:outline-offset-1 focus-within:outline-semantic-stroke-subtle';

const itemClassName =
  'body-sm flex min-h-[30px] w-23 items-center justify-between rounded-[6px] px-[6px] py-1 transition-colors focus-visible:outline-2 focus-visible:outline-offset-1';

const Select = forwardRef<ComponentRef<typeof BaseSelect.Trigger>, SelectProps>(
  function Select(
    {
      options,
      placeholder = '선택하세요',
      ariaLabel,
      className,
      contentClassName,
      optionClassName,
      ...props
    },
    ref,
  ) {
    return (
      <BaseSelect.Root {...props}>
        <BaseSelect.Trigger
          ref={ref}
          aria-label={ariaLabel}
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
                'min-w-0 flex-1',
                getSelectValueStateClass({
                  placeholder: state.placeholder,
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
                          ? 'hover:bg-semantic-bg-deeper hover:text-semantic-accent-normal'
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
  },
);

export default Select;
