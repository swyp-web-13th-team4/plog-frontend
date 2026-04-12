import { type ReactNode, useState, useMemo } from 'react';

import { Field as BaseField } from '@base-ui/react/field';
import { cn } from '@plog/utils';

import { type CharCountInfo, FieldContext } from '@/contexts/FieldContext';

type FieldProps = {
  label?: string;
  required?: boolean;
  error?: string;
  description?: string;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
};

function Field({
  label,
  required,
  error,
  description,
  disabled,
  className,
  children,
}: FieldProps) {
  const [charCount, setCharCount] = useState<CharCountInfo | null>(null);

  const hasFooter = !!error || !!description || charCount !== null;

  const contextValue = useMemo(
    () => ({
      insideField: true,
      invalid: !!error,
      disabled: !!disabled,
      required: !!required,
      onCharCountChange: setCharCount,
    }),
    [error, disabled, required, setCharCount],
  );

  return (
    <BaseField.Root
      invalid={!!error}
      disabled={disabled}
      className={cn('flex flex-col', className)}
    >
      <FieldContext.Provider value={contextValue}>
        {label && (
          <BaseField.Label className="label-lg mb-3 flex gap-1 text-semantic-object-boldest">
            {label}
            {required && (
              <span className="mt-1 inline-block size-1 rounded-full bg-primitive-red-400" />
            )}
          </BaseField.Label>
        )}

        {children}

        {hasFooter && (
          <div
            className={cn(
              'caption-md mx-2 mt-1.5 flex items-center justify-between',
              error
                ? 'text-semantic-feedback-error-normal'
                : 'text-semantic-object-subtle',
            )}
          >
            <span>
              {error ? (
                <span role="alert">{error}</span>
              ) : description ? (
                <BaseField.Description>{description}</BaseField.Description>
              ) : null}
            </span>

            {charCount !== null && (
              <span>
                {charCount.count}/{charCount.max}자
              </span>
            )}
          </div>
        )}
      </FieldContext.Provider>
    </BaseField.Root>
  );
}

export default Field;
