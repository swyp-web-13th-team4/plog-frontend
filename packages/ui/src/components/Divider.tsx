import { type ComponentPropsWithoutRef } from 'react';

import { cn } from '@plog/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const dividerVariants = cva('border-0 border-semantic-object-subtler', {
  variants: {
    thickness: {
      small: '',
      medium: '',
      large: '',
    },
    orientation: {
      horizontal: 'w-full',
      vertical: 'h-full',
    },
  },
  compoundVariants: [
    {
      thickness: 'small',
      orientation: 'horizontal',
      class: 'border-t-1',
    },
    {
      thickness: 'medium',
      orientation: 'horizontal',
      class: 'border-t-2',
    },
    {
      thickness: 'large',
      orientation: 'horizontal',
      class: 'border-t-3',
    },
    {
      thickness: 'small',
      orientation: 'vertical',
      class: 'border-l-1',
    },
    {
      thickness: 'medium',
      orientation: 'vertical',
      class: 'border-l-2',
    },
    {
      thickness: 'large',
      orientation: 'vertical',
      class: 'border-l-3',
    },
  ],
  defaultVariants: {
    thickness: 'small',
    orientation: 'horizontal',
  },
});

type DividerThickness = VariantProps<typeof dividerVariants>['thickness'];
type DividerOrientation = VariantProps<typeof dividerVariants>['orientation'];

type DividerProps = ComponentPropsWithoutRef<'div'> & {
  thickness?: DividerThickness;
  orientation?: DividerOrientation;
};

function Divider({
  className,
  thickness,
  orientation,
  ...props
}: DividerProps) {
  return (
    <div
      className={cn(dividerVariants({ thickness, orientation }), className)}
      role="separator"
      aria-orientation={orientation ?? 'horizontal'}
      {...props}
    />
  );
}

export default Divider;
