import { type ComponentPropsWithoutRef } from 'react';

import { cn } from '@plog/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const dividerVariants = cva('border-semantic-object-subtler', {
  variants: {
    thickness: {
      small: 'border-1',
      medium: 'border-2',
      large: 'border-3',
    },
    orientation: {
      horizontal: 'border-t w-full',
      vertical: 'border-l h-full',
    },
  },
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
