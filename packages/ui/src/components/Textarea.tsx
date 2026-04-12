import {
  type ComponentPropsWithoutRef,
  forwardRef,
  useEffect,
  useState,
} from 'react';

import { cn } from '@plog/utils';

import { useFieldContext } from '@/hooks/useFieldContext';
import { getFieldStateClass } from '@/utils/getFieldStateClass';

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
    const {
      insideField,
      invalid: ctxInvalid,
      disabled: ctxDisabled,
      required: ctxRequired,
      onCharCountChange,
    } = useFieldContext();

    const invalid = invalidProp ?? ctxInvalid;
    const effectiveDisabled = disabled ?? ctxDisabled;
    const effectiveRequired = required ?? ctxRequired;

    const [isFocused, setIsFocused] = useState(false);
    const [internalValue, setInternalValue] = useState(defaultValue ?? '');

    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;
    const charCount = currentValue.length;

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (!isControlled) setInternalValue(e.target.value);
      onChange?.(e);
    };

    useEffect(() => {
      if (!insideField || maxLength === undefined) return;
      onCharCountChange?.({ count: charCount, max: maxLength });
      return () => onCharCountChange?.(null);
    }, [insideField, charCount, maxLength, onCharCountChange]);

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
          onFocus={(e) => {
            setIsFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur?.(e);
          }}
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
