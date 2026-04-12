import {
  type ComponentPropsWithoutRef,
  forwardRef,
  useState,
} from 'react';

import { cn } from '@plog/utils';

type TextareaProps = Omit<
  ComponentPropsWithoutRef<'textarea'>,
  'value' | 'defaultValue' | 'className'
> & {
  invalid?: boolean;
  maxLength?: number;
  value?: string;
  defaultValue?: string;
  className?: string;
};

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    {
      invalid,
      maxLength,
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
    const [isFocused, setIsFocused] = useState(false);
    const [internalValue, setInternalValue] = useState(defaultValue ?? '');

    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;
    const charCount = currentValue.length;

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (!isControlled) setInternalValue(e.target.value);
      onChange?.(e);
    };

    return (
      <div className={cn('flex flex-col', className)}>
        <textarea
          ref={ref}
          aria-invalid={invalid}
          value={currentValue}
          onChange={handleChange}
          disabled={disabled}
          maxLength={maxLength}
          onFocus={(e) => {
            setIsFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur?.(e);
          }}
          className={cn(
            'rounded-[12px] border px-4 py-3 transition-colors',
            disabled
              ? 'cursor-not-allowed border-semantic-stroke-subtle bg-semantic-bg-deep'
              : invalid
                ? 'border-semantic-feedback-error-normal bg-semantic-feedback-error-subtler'
                : isFocused
                  ? 'border-semantic-accent-normal ring-1 ring-semantic-accent-normal'
                  : 'border-semantic-stroke-assistive bg-semantic-bg-standard hover:border-semantic-stroke-alternative',
            'body-md w-full resize-none bg-transparent text-semantic-object-boldest outline-none placeholder:text-semantic-object-subtle disabled:cursor-not-allowed disabled:text-semantic-object-subtle',
          )}
          {...props}
        />

        {maxLength !== undefined && (
          <span className="caption-md mt-1.5 mr-2 ml-auto text-semantic-object-subtle">
            {charCount}/{maxLength}자
          </span>
        )}
      </div>
    );
  },
);

export default Textarea;
