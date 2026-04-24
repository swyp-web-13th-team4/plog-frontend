import { type ComponentPropsWithoutRef, type ReactNode } from 'react';

import { Button as BaseButton } from '@base-ui/react/button';
import { cn } from '@plog/utils';

import PrevIcon from '@/assets/prev.svg?react';

type AppBarBaseProps = {
  actions?: ReactNode;
  className?: string;
};

type AppBarNavigationProps = AppBarBaseProps & {
  variant: 'navigation';
  title: string;
  onBack?: () => void;
};

type AppBarBrandProps = AppBarBaseProps & {
  variant: 'brand';
  logo: ReactNode;
};

type AppBarProps = AppBarNavigationProps | AppBarBrandProps;

type AppBarActionProps = Omit<
  ComponentPropsWithoutRef<typeof BaseButton>,
  'className' | 'children'
> & {
  icon: ReactNode;
  className?: string;
} & (
    | { 'aria-label': string; 'aria-labelledby'?: never }
    | { 'aria-label'?: never; 'aria-labelledby': string }
  );

function Action({
  icon,
  className,
  type = 'button',
  ...props
}: AppBarActionProps) {
  return (
    <BaseButton
      type={type}
      className={cn(
        'inline-flex cursor-pointer items-center justify-center rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-semantic-stroke-subtle [&_svg]:size-7 [&_svg]:fill-semantic-object-bold',
        className,
      )}
      {...props}
    >
      {icon}
    </BaseButton>
  );
}

function AppBarRoot({ actions, className, ...props }: AppBarProps) {
  return (
    <nav
      className={cn(
        'relative flex h-16 w-full items-center border-b border-b-semantic-stroke-subtle bg-semantic-bg-standard px-6',
        className,
      )}
    >
      <div className="flex items-center">
        {props.variant === 'navigation' ? (
          props.onBack && (
            <Action
              icon={<PrevIcon />}
              onClick={props.onBack}
              aria-label="뒤로 가기"
            />
          )
        ) : (
          <div className="min-w-0 overflow-hidden">{props.logo}</div>
        )}
      </div>

      {props.variant === 'navigation' && (
        <div className="pointer-events-none absolute inset-x-0 flex items-center justify-center overflow-hidden px-24">
          <span className="title-sm truncate text-semantic-object-boldest">
            {props.title}
          </span>
        </div>
      )}

      <div className="ml-auto flex items-center gap-3">{actions}</div>
    </nav>
  );
}

const AppBar = Object.assign(AppBarRoot, { Action });

export default AppBar;
