import {
  type ComponentPropsWithoutRef,
  forwardRef,
  type ReactNode,
} from 'react';

import { cn } from '@plog/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const tabItemVariants = cva(
  'label-lg box-border inline-flex shrink-0 items-center justify-start gap-1.5 whitespace-nowrap bg-transparent px-4 py-3 outline-none transition-colors focus-visible:outline-2 focus-visible:outline-semantic-accent-subtle focus-visible:outline-offset-[-2px]',
  {
    variants: {
      selected: {
        true: 'border-b-2 border-semantic-accent-normal text-semantic-accent-normal',
        false:
          'border-b border-semantic-stroke-assistive text-semantic-object-normal hover:border-semantic-stroke-neutral hover:text-semantic-object-bold active:text-semantic-object-boldest',
      },
      disabled: {
        true: 'cursor-not-allowed border-semantic-stroke-subtle text-semantic-object-subtle hover:border-semantic-stroke-subtle hover:text-semantic-object-subtle active:text-semantic-object-subtle',
        false: 'cursor-pointer',
      },
    },
    defaultVariants: {
      selected: false,
      disabled: false,
    },
  },
);

type TabItemProps = Omit<ComponentPropsWithoutRef<'button'>, 'children'> &
  VariantProps<typeof tabItemVariants> & {
    icon?: ReactNode;
    label: ReactNode;
    showIcon?: boolean;
  };

const TabItem = forwardRef<HTMLButtonElement, TabItemProps>(function TabItem(
  {
    icon,
    label,
    showIcon = true,
    selected,
    disabled,
    className,
    type = 'button',
    ...props
  },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      className={cn(tabItemVariants({ selected, disabled }), className)}
      {...props}
    >
      {showIcon && icon ? (
        <span className="shrink-0 [&>svg]:block [&>svg]:size-6">{icon}</span>
      ) : null}
      <span className="truncate">{label}</span>
    </button>
  );
});

export type { TabItemProps };
export default TabItem;
