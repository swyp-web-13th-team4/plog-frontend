import {
  type ComponentPropsWithoutRef,
  type ComponentRef,
  type ReactNode,
  type Ref,
} from 'react';

import { Button as BaseButton } from '@base-ui/react/button';
import { cn } from '@plog/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const iconButtonVariants = cva(
  'inline-flex cursor-pointer items-center justify-center rounded-lg transition-colors disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 [&_svg]:fill-semantic-object-normal',
  {
    variants: {
      variant: {
        outline:
          'border border-semantic-stroke-assistive bg-semantic-system-white hover:bg-semantic-bg-deep active:bg-semantic-bg-deeper disabled:bg-semantic-bg-deep disabled:hover:bg-semantic-bg-deep disabled:active:bg-semantic-bg-deep disabled:border-semantic-stroke-subtle disabled:[&_svg]:fill-semantic-object-subtle focus-visible:outline-semantic-stroke-subtle aria-expanded:border-semantic-accent-normal aria-expanded:[&_svg]:fill-semantic-accent-normal',
        ghost:
          'bg-transparent hover:bg-primitive-gray-350/10 active:bg-primitive-gray-350/20 disabled:hover:bg-transparent disabled:active:bg-transparent focus-visible:outline-semantic-stroke-subtle disabled:[&_svg]:fill-primitive-gray-80 aria-expanded:[&_svg]:fill-semantic-accent-normal',
      },
      size: {
        large: 'size-10 [&_svg]:size-5',
        small: 'size-9 [&_svg]:size-4',
      },
    },
    defaultVariants: {
      variant: 'outline',
      size: 'large',
    },
  },
);

type IconButtonProps = VariantProps<typeof iconButtonVariants> &
  Omit<
    ComponentPropsWithoutRef<typeof BaseButton>,
    'className' | 'children' | 'aria-label' | 'aria-labelledby'
  > & {
    icon: ReactNode;
    className?: string;
    ref?: Ref<ComponentRef<typeof BaseButton>>;
  } & (
    | { 'aria-label': string; 'aria-labelledby'?: never }
    | { 'aria-label'?: never; 'aria-labelledby': string }
  );

function IconButton({
  ref,
  variant,
  size,
  icon,
  className,
  type = 'button',
  ...props
}: IconButtonProps) {
  return (
    <BaseButton
      ref={ref}
      type={type}
      className={cn(iconButtonVariants({ variant, size }), className)}
      {...props}
    >
      {icon}
    </BaseButton>
  );
}

export default IconButton;
