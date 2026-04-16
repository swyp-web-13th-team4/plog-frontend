import { type ComponentPropsWithoutRef, type ReactNode } from 'react';

import { Button as BaseButton } from '@base-ui/react/button';
import { cn } from '@plog/utils';

type BottomNavigationItemProps = ComponentPropsWithoutRef<typeof BaseButton> & {
  icon: ReactNode;
  label: string;
  isActive?: boolean;
};

type BottomNavigationProps = Omit<
  ComponentPropsWithoutRef<'nav'>,
  'className' | 'style'
> & {
  children: ReactNode;
};

function Item({ icon, label, isActive, ...props }: BottomNavigationItemProps) {
  return (
    <BaseButton
      className={cn(
        'flex cursor-pointer flex-col items-center justify-center gap-1',
        isActive
          ? '[&_svg]:fill-semantic-accent-normal'
          : '[&_svg]:fill-semantic-tab-disabled',
      )}
      type="button"
      role="tab"
      aria-selected={isActive}
      {...props}
    >
      {icon}
      <span
        className={cn(
          'caption-md',
          isActive
            ? 'text-semantic-accent-normal'
            : 'text-semantic-object-subtle',
        )}
      >
        {label}
      </span>
    </BaseButton>
  );
}

function BottomNavigationRoot({ children, ...props }: BottomNavigationProps) {
  return (
    <nav
      className="flex w-full justify-between px-8 py-3 shadow-[0px_-4px_12px_0px_rgba(0,0,0,0.04)]"
      role="tablist"
      {...props}
    >
      {children}
    </nav>
  );
}

const BottomNavigation = Object.assign(BottomNavigationRoot, { Item });

export default BottomNavigation;
