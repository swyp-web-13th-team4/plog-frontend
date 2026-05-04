import {
  type ComponentPropsWithoutRef,
  type ComponentRef,
  type ReactNode,
  type Ref,
  useEffect,
} from 'react';

import { Input as BaseInput } from '@base-ui/react/input';
import { cn } from '@plog/utils';

import ClearIcon from '@/assets/clear.svg?react';
import { useFieldContext } from '@/shared/FieldContext';
import { getFieldStateClass } from '@/shared/getFieldStateClass';
import { useTextInput } from '@/shared/useTextInput';

type InputProps = Omit<
  ComponentPropsWithoutRef<'input'>,
  'value' | 'defaultValue' | 'aria-invalid'
> & {
  invalid?: boolean;
  trailing?: ReactNode;
  ref?: Ref<ComponentRef<typeof BaseInput>>;
  containerClassName?: string;
} & (
    | { value?: undefined; defaultValue?: string; onClear?: () => void }
    | { value: string; defaultValue?: never; onClear: () => void }
  );

function Input({
  ref,
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
  maxLength,
  className,
  containerClassName,
  ...props
}: InputProps) {
  const { insideField, onCharCountChange } = useFieldContext();

  const {
    invalid,
    effectiveDisabled,
    effectiveRequired,
    currentValue,
    isFocused,
    handleChange,
    handleFocus,
    handleBlur,
    reset,
  } = useTextInput<HTMLInputElement>({
    value,
    defaultValue,
    invalid: invalidProp,
    disabled,
    required,
    onChange,
    onFocus,
    onBlur,
  });

  const charCount = currentValue.length;

  useEffect(() => {
    if (!insideField || maxLength === undefined) return;
    onCharCountChange?.({ count: charCount, max: maxLength });
  }, [insideField, charCount, maxLength, onCharCountChange]);

  useEffect(() => {
    if (!insideField || maxLength === undefined) return;
    return () => onCharCountChange?.(null);
  }, [insideField, maxLength, onCharCountChange]);

  const hasValue = charCount > 0;
  const showClear = isFocused && hasValue;
  const hasTrailing = showClear || !!trailing;

  const handleClear = () => {
    reset();
    onClear?.();
  };

  return (
    <div className={cn('flex flex-col', containerClassName)}>
      <div
        className={cn(
          'relative rounded-xl border transition-colors',
          getFieldStateClass(effectiveDisabled, invalid, isFocused),
        )}
      >
        <BaseInput
          ref={ref}
          aria-invalid={invalid}
          value={currentValue}
          onChange={handleChange}
          disabled={effectiveDisabled}
          required={effectiveRequired}
          maxLength={maxLength}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={cn(
            'body-md w-full bg-transparent py-3 pl-4 text-semantic-object-boldest outline-none placeholder:text-semantic-object-subtle disabled:cursor-not-allowed disabled:text-semantic-object-subtle',
            hasTrailing ? 'pr-12' : 'pr-4',
            className,
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

      {!insideField && maxLength !== undefined && (
        <span
          className={cn(
            'caption-md mt-1.5 ml-auto',
            invalid
              ? 'text-semantic-feedback-error-normal'
              : 'text-semantic-object-subtle',
          )}
        >
          {charCount}/{maxLength}자
        </span>
      )}
    </div>
  );
}

export default Input;
