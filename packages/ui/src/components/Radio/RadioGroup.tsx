import { type ComponentPropsWithoutRef, useId } from 'react';

import { RadioGroup as BaseRadioGroup } from '@base-ui/react/radio-group';
import { cn } from '@plog/utils';

import Radio from './Radio';
import { type RadioGroupOption } from './RadioGroup.types';

type RadioGroupProps = Omit<
  ComponentPropsWithoutRef<typeof BaseRadioGroup>,
  'children' | 'value' | 'defaultValue' | 'onValueChange'
> & {
  items: RadioGroupOption[];
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: string) => void;
  itemClassName?: string;
  labelClassName?: string;
};

function RadioGroup({
  items,
  value,
  defaultValue,
  onValueChange,
  disabled,
  className,
  itemClassName,
  labelClassName,
  ...props
}: RadioGroupProps) {
  const groupId = useId();

  return (
    <BaseRadioGroup
      value={value}
      defaultValue={defaultValue}
      onValueChange={(nextValue) => {
        if (typeof nextValue === 'string') onValueChange?.(nextValue);
      }}
      disabled={disabled}
      className={cn('flex flex-col gap-3', className)}
      {...props}
    >
      {items.map((item) => {
        const itemId = `${groupId}-${item.value}`;
        const isDisabled = disabled || item.disabled;

        return (
          <div
            key={item.value}
            className={cn('flex items-center gap-2', itemClassName)}
          >
            <Radio id={itemId} value={item.value} disabled={item.disabled} />
            <label
              htmlFor={itemId}
              className={cn(
                'label-md',
                isDisabled
                  ? 'cursor-not-allowed text-semantic-object-subtle'
                  : 'cursor-pointer',
                labelClassName,
              )}
            >
              {item.label}
            </label>
          </div>
        );
      })}
    </BaseRadioGroup>
  );
}

export default RadioGroup;
