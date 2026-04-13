import { type ComponentProps, forwardRef, type ReactNode } from 'react';

import { Button as BaseButton } from '@base-ui/react/button';
import { cn } from '@plog/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const chipVariants = cva(
  'inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-full transition-colors disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-1',
  {
    variants: {
      selected: {
        false:
          'bg-semantic-object-subtler text-semantic-object-bold enabled:hover:bg-semantic-object-subtle enabled:active:bg-semantic-object-subtle disabled:bg-semantic-object-subtler disabled:text-semantic-object-subtle focus-visible:outline-semantic-stroke-subtle',
        true: 'bg-semantic-accent-normal text-semantic-object-inverse enabled:hover:bg-semantic-accent-bold enabled:active:bg-semantic-accent-bolder disabled:bg-semantic-object-subtler disabled:text-semantic-object-subtle focus-visible:outline-semantic-accent-subtle',
      },
    },
    defaultVariants: {
      selected: false,
    },
  },
);

const chipBaseLayout =
  'label-sm gap-1.5 px-3 py-2 [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:fill-current';

type ChipProps = ComponentProps<typeof BaseButton> &
  VariantProps<typeof chipVariants> & {
    iconLeft?: ReactNode;
    iconRight?: ReactNode;
  };

const Chip = forwardRef<HTMLButtonElement, ChipProps>(function Chip(
  {
    className,
    children,
    iconLeft,
    iconRight,
    selected,
    type = 'button',
    ...props
  },
  ref,
) {
  const isSelected = selected === true;

  return (
    <BaseButton
      ref={ref}
      type={type}
      aria-pressed={isSelected}
      className={cn(
        chipBaseLayout,
        chipVariants({ selected: isSelected }),
        className,
      )}
      {...props}
    >
      {iconLeft}
      {children}
      {iconRight}
    </BaseButton>
  );
});

export default Chip;
