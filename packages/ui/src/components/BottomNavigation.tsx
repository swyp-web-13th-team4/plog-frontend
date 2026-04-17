import { type ComponentPropsWithoutRef, type ReactNode } from 'react';

import { Button as BaseButton } from '@base-ui/react/button';
import { cn } from '@plog/utils';

type BottomNavigationItemProps = Omit<
  ComponentPropsWithoutRef<typeof BaseButton>,
  'className' | 'style'
> & {
  icon: ReactNode;
  label: string;
  active?: boolean;
};

type BottomNavigationProps = Omit<
  ComponentPropsWithoutRef<'nav'>,
  'className' | 'style'
> & {
  children: ReactNode;
};

function Item({ icon, label, active, ...props }: BottomNavigationItemProps) {
  return (
    <li>
      <BaseButton
        {...props}
        className={cn(
          'flex cursor-pointer flex-col items-center justify-center gap-1',
          active
            ? '[&_svg]:fill-semantic-accent-normal'
            : '[&_svg]:fill-semantic-tab-disabled',
        )}
        type="button"
        aria-current={active ? 'page' : undefined}
      >
        {icon}
        <span
          className={cn(
            'caption-md',
            active
              ? 'text-semantic-accent-normal'
              : 'text-semantic-object-subtle',
          )}
        >
          {label}
        </span>
      </BaseButton>
    </li>
  );
}

function BottomNavigationRoot({ children, ...props }: BottomNavigationProps) {
  return (
    <nav
      {...props}
      className="w-full px-8 py-3 shadow-[0px_-4px_12px_0px_rgba(0,0,0,0.04)]"
    >
      <ul className="flex w-full justify-between">{children}</ul>
    </nav>
  );
}

const BottomNavigation = Object.assign(BottomNavigationRoot, { Item });

export default BottomNavigation;
