import {
  type ComponentPropsWithoutRef,
  forwardRef,
  type ReactNode,
} from 'react';

import { Toggle as BaseToggle } from '@base-ui/react/toggle';
import { cn } from '@plog/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const chipVariants = cva(
  'inline-flex cursor-pointer items-center min-w-13 justify-center whitespace-nowrap rounded-full transition-colors disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-1',
  {
    variants: {
      pressed: {
        false:
          'bg-semantic-object-subtler text-semantic-object-bold enabled:hover:bg-semantic-object-subtle enabled:active:bg-semantic-object-subtle disabled:bg-semantic-object-subtler disabled:text-semantic-object-subtle focus-visible:outline-semantic-stroke-subtle',
        true: 'bg-semantic-accent-normal text-semantic-object-inverse enabled:hover:bg-semantic-accent-bold enabled:active:bg-semantic-accent-bolder disabled:bg-semantic-object-subtler disabled:text-semantic-object-subtle focus-visible:outline-semantic-accent-subtle',
      },
      size: {
        sm: 'label-sm gap-1.5 px-3 py-2 [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:fill-current',
        lg: 'label-lg gap-2.5 px-4 py-3 [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:fill-current',
      },
    },
    defaultVariants: {
      size: 'sm',
    },
  },
);

type ChipSize = VariantProps<typeof chipVariants>['size'];

type ChipProps = Omit<
  ComponentPropsWithoutRef<typeof BaseToggle>,
  'className'
> & {
  size?: ChipSize;
  className?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
};

const Chip = forwardRef<HTMLButtonElement, ChipProps>(function Chip(
  { className, children, iconLeft, iconRight, size, type = 'button', ...props },
  ref,
) {
  return (
    <BaseToggle
      ref={ref}
      type={type}
      className={(state) =>
        cn(chipVariants({ pressed: state.pressed, size }), className)
      }
      {...props}
    >
      {iconLeft}
      {children}
      {iconRight}
    </BaseToggle>
  );
});

export default Chip;
