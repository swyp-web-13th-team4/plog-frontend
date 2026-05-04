import { type ReactNode, useId, useMemo, useState } from 'react';

import { Field as BaseField } from '@base-ui/react/field';
import { cn } from '@plog/utils';

import { type CharCountInfo, FieldContext } from '@/shared/FieldContext';

type FieldProps = {
  label?: string;
  required?: boolean;
  error?: string;
  success?: string;
  description?: string;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
};

function Field({
  label,
  required,
  error,
  success,
  description,
  disabled,
  className,
  children,
}: FieldProps) {
  const [charCount, setCharCount] = useState<CharCountInfo | null>(null);
  const id = useId();
  const messageId = `${id}-message`;

  const hasFooter = !!error || !!success || !!description || charCount !== null;

  const contextValue = useMemo(
    () => ({
      insideField: true,
      invalid: !!error,
      disabled: !!disabled,
      required: !!required,
      onCharCountChange: setCharCount,
      messageId: hasFooter ? messageId : undefined,
    }),
    [error, disabled, required, messageId, hasFooter],
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
              <>
                <span
                  aria-hidden="true"
                  className="mt-1 inline-block size-1 rounded-full bg-primitive-red-400"
                />
                <span className="sr-only">필수</span>
              </>
            )}
          </BaseField.Label>
        )}

        {children}

        {hasFooter && (
          <div className="caption-md mt-1.5 flex items-center justify-between">
            {error ? (
              <span
                id={messageId}
                role="alert"
                className="text-semantic-feedback-error-normal"
              >
                {error}
              </span>
            ) : success ? (
              <span
                id={messageId}
                role="status"
                className="text-semantic-feedback-success-normal"
              >
                {success}
              </span>
            ) : description ? (
              <BaseField.Description
                id={messageId}
                className="text-semantic-object-subtle"
              >
                {description}
              </BaseField.Description>
            ) : null}

            {charCount !== null && (
              <span
                className={cn(
                  'ml-auto',
                  error
                    ? 'text-semantic-feedback-error-normal'
                    : success
                      ? 'text-semantic-feedback-success-bold'
                      : 'text-semantic-object-subtle',
                )}
              >
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
