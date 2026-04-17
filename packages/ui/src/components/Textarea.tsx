import { type ComponentPropsWithoutRef, forwardRef, useEffect } from 'react';

import { cn } from '@plog/utils';

import { useFieldContext } from '@/hooks/useFieldContext';
import { useTextInput } from '@/hooks/useTextInput';
import { getFieldStateClass } from '@/utils/getFieldStateClass';

type TextareaProps = Omit<
  ComponentPropsWithoutRef<'textarea'>,
  'value' | 'defaultValue'
> & {
  invalid?: boolean;
  maxLength?: number;
} & (
    | { value?: undefined; defaultValue?: string }
    | { value: string; defaultValue?: never }
  );

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    {
      invalid: invalidProp,
      maxLength,
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
    } = useTextInput<HTMLTextAreaElement>({
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

    return (
      <div className={cn('flex flex-col', className)}>
        <textarea
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
            'body-md w-full resize-none rounded-[12px] border bg-transparent px-4 py-3 text-semantic-object-boldest transition-colors outline-none placeholder:text-semantic-object-subtle disabled:cursor-not-allowed disabled:text-semantic-object-subtle',
            getFieldStateClass(effectiveDisabled, invalid, isFocused),
          )}
          {...props}
        />

        {!insideField && maxLength !== undefined && (
          <span
            className={cn(
              'caption-md mt-1.5 mr-2 ml-auto',
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
  },
);

export default Textarea;
