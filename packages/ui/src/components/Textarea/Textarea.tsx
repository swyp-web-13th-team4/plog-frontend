import { type ComponentPropsWithoutRef, type Ref, useEffect } from 'react';

import { Field as BaseField } from '@base-ui/react/field';
import { mergeProps } from '@base-ui/react/merge-props';
import { cn } from '@plog/utils';

import { useFieldContext } from '@/shared/FieldContext';
import { getFieldStateClass } from '@/shared/getFieldStateClass';
import { mergeAriaIds } from '@/shared/mergeAriaIds';
import { useTextInput } from '@/shared/useTextInput';

type TextareaProps = Omit<
  ComponentPropsWithoutRef<'textarea'>,
  'value' | 'defaultValue' | 'aria-invalid'
> & {
  invalid?: boolean;
  maxLength?: number;
  ref?: Ref<HTMLTextAreaElement>;
  containerClassName?: string;
} & (
    | { value?: undefined; defaultValue?: string }
    | { value: string; defaultValue?: never }
  );

function Textarea({
  ref,
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
  containerClassName,
  'aria-describedby': ariaDescribedby,
  ...props
}: TextareaProps) {
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
    <div className={cn('flex flex-col', containerClassName)}>
      <BaseField.Control
        ref={ref}
        disabled={effectiveDisabled}
        aria-invalid={invalid}
        render={(controlProps) => (
          <textarea
            {...mergeProps<'textarea'>(controlProps, {
              value: currentValue,
              onChange: handleChange,
              required: effectiveRequired,
              maxLength,
              onFocus: handleFocus,
              onBlur: handleBlur,
              className: cn(
                'body-md h-34 w-full resize-none rounded-xl border bg-transparent px-4 py-3 text-semantic-object-boldest transition-colors outline-none placeholder:text-semantic-object-subtle disabled:cursor-not-allowed disabled:text-semantic-object-subtle',
                getFieldStateClass(effectiveDisabled, invalid, isFocused),
                className,
              ),
              ...props,
            })}
            aria-describedby={mergeAriaIds(
              controlProps['aria-describedby'],
              ariaDescribedby,
            )}
          />
        )}
      />

      {!insideField && maxLength !== undefined && (
        <span
          className={cn(
            'caption-md mt-1.5 ml-auto',
            invalid
              ? 'text-semantic-theme-red-normal'
              : 'text-semantic-object-subtle',
          )}
        >
          {charCount}/{maxLength}자
        </span>
      )}
    </div>
  );
}

export default Textarea;
