import { type ComponentPropsWithoutRef, type ReactNode, type Ref } from 'react';

import { cn } from '@plog/utils';

type SelectTriggerButtonProps = Omit<
  ComponentPropsWithoutRef<'button'>,
  'value'
> & {
  ref?: Ref<HTMLButtonElement>;
  icon: ReactNode;
  placeholder: string;
  invalid?: boolean;
  value: string | null;
};

export default function SelectTriggerButton({
  className,
  icon,
  placeholder,
  invalid = false,
  ref,
  value,
  ...props
}: SelectTriggerButtonProps) {
  const hasValue = value !== null && value !== '';
  return (
    <button
      ref={ref}
      type="button"
      {...props}
      className={cn(
        'body-md flex w-full cursor-pointer items-center gap-3 rounded-xl border bg-semantic-system-white px-4 py-3 text-left transition-colors outline-none',
        invalid
          ? 'border-semantic-theme-red-normal bg-semantic-theme-red-subtler focus-visible:border-semantic-theme-red-normal focus-visible:ring-1 focus-visible:ring-semantic-theme-red-normal'
          : 'border-semantic-stroke-subtle hover:border-semantic-stroke-alternative focus-visible:border-semantic-accent-normal focus-visible:ring-1 focus-visible:ring-semantic-accent-normal',
        className,
      )}
    >
      <span
        className={cn(
          'min-w-0 flex-1 truncate',
          hasValue
            ? 'text-semantic-object-boldest'
            : 'text-semantic-object-subtle',
        )}
      >
        {hasValue ? value : placeholder}
      </span>
      {icon}
    </button>
  );
}
