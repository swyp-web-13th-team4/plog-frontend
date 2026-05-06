import { type ComponentPropsWithoutRef, type ReactNode, type Ref } from 'react';

import { cn } from '@plog/utils';
import { cva } from 'class-variance-authority';

import { type TabIconProps } from './Tab.types';

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

type TabItemProps = Omit<ComponentPropsWithoutRef<'button'>, 'children'> & {
  selected?: boolean | null;
  disabled?: boolean | null;
  label: ReactNode;
  ref?: Ref<HTMLButtonElement>;
} & TabIconProps;

function TabItem({
  ref,
  icon,
  activeIcon,
  label,
  selected,
  disabled,
  className,
  type = 'button',
  ...props
}: TabItemProps) {
  const resolvedIcon = selected && activeIcon ? activeIcon : icon;

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled ?? false}
      className={cn(tabItemVariants({ selected, disabled }), className)}
      {...props}
    >
      {resolvedIcon ? (
        <span className="flex shrink-0 items-center justify-center [&>svg]:block [&>svg]:size-6">
          {resolvedIcon}
        </span>
      ) : null}
      <span className="truncate">{label}</span>
    </button>
  );
}

export default TabItem;
