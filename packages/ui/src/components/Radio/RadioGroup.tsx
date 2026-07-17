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

  if (process.env.NODE_ENV !== 'production') {
    const uniqueValues = new Set<string>();
    const duplicates = new Set<string>();

    for (const { value } of items) {
      if (uniqueValues.has(value)) duplicates.add(value);
      uniqueValues.add(value);
    }

    if (duplicates.size > 0) {
      console.error(
        `RadioGroup item의 value는 그룹 내에서 고유해야 합니다. 중복된 value: ${[
          ...duplicates,
        ].join(', ')}`,
      );
    }
  }

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
