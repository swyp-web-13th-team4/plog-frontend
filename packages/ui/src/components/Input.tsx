import {
  type ComponentPropsWithoutRef,
  type ComponentRef,
  forwardRef,
  type ReactNode,
} from 'react';

import { Input as BaseInput } from '@base-ui/react/input';
import { cn } from '@plog/utils';

import ClearIcon from '@/assets/clear.svg?react';
import { useTextInput } from '@/hooks/useTextInput';
import { getFieldStateClass } from '@/utils/getFieldStateClass';

type InputProps = Omit<
  ComponentPropsWithoutRef<'input'>,
  'value' | 'defaultValue'
> & {
  invalid?: boolean;
  trailing?: ReactNode;
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

    const hasValue = currentValue.length > 0;
    const showClear = isFocused && hasValue;
    const hasTrailing = showClear || !!trailing;

    const handleClear = () => {
      reset();
      onClear?.();
    };

    return (
      <div
        className={cn(
          'relative rounded-[12px] border transition-colors',
          getFieldStateClass(effectiveDisabled, invalid, isFocused),
          className,
        )}
      >
        <BaseInput
          ref={ref}
          aria-invalid={invalid}
          value={currentValue}
          onChange={handleChange}
          disabled={effectiveDisabled}
          required={effectiveRequired}
          onFocus={handleFocus}
          onBlur={handleBlur}
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
