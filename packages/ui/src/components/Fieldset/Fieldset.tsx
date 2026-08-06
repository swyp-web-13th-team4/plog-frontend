import { type ReactNode, useId } from 'react';

import { Fieldset as BaseFieldset } from '@base-ui/react/fieldset';
import { cn } from '@plog/utils';

import RequiredMark from '@/shared/RequiredMark';

type FieldsetProps = {
  label?: string;
  required?: boolean;
  error?: string;
  success?: string;
  description?: string;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
};

function Fieldset({
  label,
  required,
  error,
  success,
  description,
  disabled,
  className,
  children,
}: FieldsetProps) {
  const id = useId();
  const messageId = `${id}-message`;

  const hasMessage = !!error || !!success || !!description;

  return (
    <BaseFieldset.Root
      disabled={disabled}
      render={<fieldset disabled={disabled} />}
      aria-describedby={hasMessage ? messageId : undefined}
      className={cn('flex min-w-0 flex-col', className)}
    >
      {label && (
        <BaseFieldset.Legend className="label-lg mb-3 flex gap-1 text-semantic-object-boldest">
          {label}
          {required && <RequiredMark />}
        </BaseFieldset.Legend>
      )}
      {children}
      {hasMessage && (
        <div className="caption-md mt-1.5">
          {error ? (
            <span
              id={messageId}
              role="alert"
              className="text-semantic-theme-red-normal"
            >
              {error}
            </span>
          ) : success ? (
            <span
              id={messageId}
              role="status"
              className="text-semantic-theme-green-normal"
            >
              {success}
            </span>
          ) : (
            <span id={messageId} className="text-semantic-object-subtle">
              {description}
            </span>
          )}
        </div>
      )}
    </BaseFieldset.Root>
  );
}

export default Fieldset;
