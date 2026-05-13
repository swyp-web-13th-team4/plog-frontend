import { type ComponentPropsWithoutRef, type ReactNode, type Ref } from 'react';

import { cn } from '@plog/utils';

type SelectTriggerButtonProps = Omit<
  ComponentPropsWithoutRef<'button'>,
  'value'
> & {
  ref?: Ref<HTMLButtonElement>;
  value: string | null;
  placeholder: string;
  icon: ReactNode;
};

export default function SelectTriggerButton({
  value,
  placeholder,
  icon,
  ref,
  ...props
}: SelectTriggerButtonProps) {
  return (
    <button
      ref={ref}
      type="button"
      {...props}
      className="body-md flex w-full cursor-pointer items-center gap-3 rounded-xl border border-semantic-stroke-subtle bg-semantic-system-white px-4 py-3 text-left transition-colors outline-none hover:border-semantic-stroke-alternative focus-visible:border-semantic-accent-normal focus-visible:ring-1 focus-visible:ring-semantic-accent-normal"
    >
      <span
        className={cn(
          'min-w-0 flex-1 truncate',
          value
            ? 'text-semantic-object-boldest'
            : 'text-semantic-object-subtle',
        )}
      >
        {value ?? placeholder}
      </span>
      {icon}
    </button>
  );
}
