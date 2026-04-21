import {
  type ComponentPropsWithoutRef,
  type ComponentRef,
  type ReactNode,
  type Ref,
} from 'react';

import { Toggle as BaseToggle } from '@base-ui/react/toggle';
import { cn } from '@plog/utils';
import { cva } from 'class-variance-authority';

import { type ChipSize, type ChipVariant } from './Chip.types';

const chipVariants = cva(
  'inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-full transition-colors disabled:cursor-not-allowed disabled:ring-0 focus-visible:outline-2 focus-visible:outline-offset-1',
  {
    variants: {
      pressed: {
        false:
          'bg-semantic-object-subtler text-semantic-object-bold enabled:hover:bg-semantic-object-subtle enabled:active:bg-semantic-object-subtle disabled:bg-semantic-object-subtler disabled:text-semantic-object-subtle focus-visible:outline-semantic-stroke-subtle',
        true: 'disabled:bg-semantic-object-subtler disabled:text-semantic-object-subtle',
      },
      variant: {
        solid: '',
        soft: '',
      },
      size: {
        small:
          'label-sm gap-1.5 px-3 py-2 [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:fill-current min-w-13',
        large:
          'label-lg gap-2.5 px-4 py-3 [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:fill-current min-w-18',
      },
    },
    compoundVariants: [
      {
        variant: 'solid',
        pressed: true,
        class:
          'bg-semantic-accent-normal text-semantic-object-inverse enabled:hover:bg-semantic-accent-bold enabled:active:bg-semantic-accent-bolder focus-visible:outline-semantic-accent-subtle',
      },
      {
        variant: 'soft',
        pressed: true,
        class:
          'bg-semantic-feedback-success-subtle text-semantic-accent-normal ring-1 ring-semantic-accent-normal enabled:hover:bg-semantic-feedback-success-assistive enabled:active:bg-semantic-feedback-success-alternative focus-visible:outline-semantic-accent-subtle',
      },
    ],
    defaultVariants: {
      size: 'small',
      variant: 'solid',
    },
  },
);

type ChipProps = Omit<
  ComponentPropsWithoutRef<typeof BaseToggle>,
  'className'
> & {
  size?: ChipSize;
  variant?: ChipVariant;
  className?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  ref?: Ref<ComponentRef<typeof BaseToggle>>;
};

function Chip({
  ref,
  className,
  children,
  iconLeft,
  iconRight,
  size,
  variant,
  type = 'button',
  ...props
}: ChipProps) {
  return (
    <BaseToggle
      ref={ref}
      type={type}
      className={(state) =>
        cn(chipVariants({ pressed: state.pressed, size, variant }), className)
      }
      {...props}
    >
      {iconLeft}
      {children}
      {iconRight}
    </BaseToggle>
  );
}

export default Chip;
