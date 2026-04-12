import {
  type ComponentPropsWithoutRef,
  forwardRef,
  type ReactNode,
  useState,
} from 'react';

import { Input as BaseInput } from '@base-ui/react/input';
import { cn } from '@plog/utils';

import ClearIcon from '@/assets/clear.svg?react';
import { useFieldContext } from '@/hooks/useFieldContext';

type InputProps = Omit<
  ComponentPropsWithoutRef<'input'>,
  'value' | 'defaultValue' | 'className'
> & {
  invalid?: boolean;
  trailing?: ReactNode;
  onClear?: () => void;
  value?: string;
  defaultValue?: string;
  className?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    invalid: invalidProp,
    trailing,
    onClear,
    disabled,
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
  const { invalid: ctxInvalid, disabled: ctxDisabled } = useFieldContext();

  const invalid = invalidProp ?? ctxInvalid;
  const effectiveDisabled = disabled ?? ctxDisabled;

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
    effectiveDisabled
      ? 'cursor-not-allowed border-semantic-stroke-subtle bg-semantic-bg-deep'
      : invalid
        ? 'border-semantic-feedback-error-normal bg-semantic-feedback-error-subtler'
        : isFocused
          ? 'border-semantic-accent-normal ring-1 ring-semantic-accent-normal'
          : 'border-semantic-stroke-assistive bg-semantic-bg-standard hover:border-semantic-stroke-alternative',
    className,
  );

  return (
    <div className={containerClass}>
      <BaseInput
        ref={ref}
        value={currentValue}
        onChange={handleChange}
        disabled={effectiveDisabled}
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
});

export default Input;
