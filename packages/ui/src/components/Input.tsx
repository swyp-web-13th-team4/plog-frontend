import React, {
  type ComponentPropsWithoutRef,
  type ComponentRef,
  forwardRef,
  type ReactNode,
  useState,
} from 'react';

import { Input as BaseInput } from '@base-ui/react/input';
import { cn } from '@plog/utils';

import ClearIcon from '@/assets/clear.svg?react';
import { useFieldContext } from '@/hooks/useFieldContext';
import { getFieldStateClass } from '@/utils/getFieldStateClass';

type InputProps = Omit<
  ComponentPropsWithoutRef<'input'>,
  'value' | 'defaultValue' | 'className'
> & {
  invalid?: boolean;
  trailing?: ReactNode;
  className?: string;
} & (
    | { value?: undefined; defaultValue?: string; onClear?: () => void }
    | { value: string; defaultValue?: never; onClear: () => void }
  );

const Input = forwardRef<ComponentRef<typeof BaseInput>, InputProps>(
  function Input(
    {
      invalid: invalidProp,
      trailing,
      onClear,
      disabled,
      required,
      value,
      defaultValue,
      onChange,
      onFocus,
      onBlur,
      className,
      ...props
    },
    ref,
  ) {
    const {
      invalid: ctxInvalid,
      disabled: ctxDisabled,
      required: ctxRequired,
    } = useFieldContext();

    const invalid = invalidProp ?? ctxInvalid;
    const effectiveDisabled = disabled ?? ctxDisabled;
    const effectiveRequired = required ?? ctxRequired;

    const [isFocused, setIsFocused] = useState(false);
    const [internalValue, setInternalValue] = useState(defaultValue ?? '');

    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;
    const hasValue = currentValue.length > 0;
    const showClear = isFocused && hasValue;
    const hasTrailing = showClear || !!trailing;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) setInternalValue(e.target.value);
      onChange?.(e);
    };

    const handleClear = () => {
      if (!isControlled) setInternalValue('');
      onClear?.();
    };

    const containerClass = cn(
      'relative rounded-[12px] border transition-colors',
      getFieldStateClass(effectiveDisabled, invalid, isFocused),
      className,
    );

    return (
      <div className={containerClass}>
        <BaseInput
          ref={ref}
          aria-invalid={invalid}
          value={currentValue}
          onChange={handleChange}
          disabled={effectiveDisabled}
          required={effectiveRequired}
          onFocus={(e) => {
            setIsFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur?.(e);
          }}
          className={cn(
            'body-md w-full bg-transparent py-3 pl-4 text-semantic-object-boldest outline-none placeholder:text-semantic-object-subtle disabled:cursor-not-allowed disabled:text-semantic-object-subtle',
            hasTrailing ? 'pr-12' : 'pr-4',
          )}
          {...props}
        />

        {(showClear || trailing) && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-4">
            {showClear ? (
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={handleClear}
                className="cursor-pointer"
                tabIndex={-1}
                aria-label="입력값 초기화"
              >
                <ClearIcon
                  fill="currentColor"
                  className={
                    invalid
                      ? 'text-semantic-feedback-error-normal'
                      : 'text-semantic-object-subtle'
                  }
                />
              </button>
            ) : (
              trailing
            )}
          </div>
        )}
      </div>
    );
  },
);

export default Input;
