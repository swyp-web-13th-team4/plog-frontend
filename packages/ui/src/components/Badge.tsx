import { type ComponentPropsWithoutRef, forwardRef } from 'react';

import { cn } from '@plog/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const badgeVariants = cva('caption-md rounded-sm py-0.5 px-1.5', {
  variants: {
    variant: {
      solid: 'text-semantic-system-white',
      soft: '',
      outline: 'bg-semantic-system-white border',
    },
    color: {
      gray: '',
      skyblue: '',
      green: '',
      yellow: '',
      orange: '',
    },
  },
  compoundVariants: [
    { variant: 'solid', color: 'gray', class: 'bg-semantic-object-normal' },
    {
      variant: 'solid',
      color: 'skyblue',
      class: 'bg-semantic-theme-sky-normal',
    },
    { variant: 'solid', color: 'green', class: 'bg-semantic-accent-normal' },
    {
      variant: 'solid',
      color: 'yellow',
      class:
        'bg-semantic-theme-yellow-normal text-semantic-theme-yellow-bolder',
    },
    {
      variant: 'solid',
      color: 'orange',
      class: 'bg-semantic-theme-orange-normal',
    },
    {
      variant: 'soft',
      color: 'gray',
      class: 'bg-primitive-gray-40 text-semantic-object-normal',
    },
    {
      variant: 'soft',
      color: 'skyblue',
      class: 'bg-semantic-theme-sky-subtle text-semantic-theme-sky-normal',
    },
    {
      variant: 'soft',
      color: 'green',
      class: 'bg-semantic-accent-subtler text-semantic-accent-normal',
    },
    {
      variant: 'soft',
      color: 'yellow',
      class: 'bg-semantic-theme-yellow-subtle text-semantic-theme-yellow-bold',
    },
    {
      variant: 'soft',
      color: 'orange',
      class:
        'bg-semantic-theme-orange-subtle text-semantic-theme-orange-normal',
    },
    {
      variant: 'outline',
      color: 'gray',
      class: 'border-semantic-stroke-subtle text-semantic-object-normal',
    },
    {
      variant: 'outline',
      color: 'skyblue',
      class:
        'border-semantic-theme-sky-alternative text-semantic-theme-sky-normal',
    },
    {
      variant: 'outline',
      color: 'green',
      class: 'border-semantic-accent-alternative text-semantic-accent-normal',
    },
    {
      variant: 'outline',
      color: 'yellow',
      class:
        'border-semantic-theme-yellow-normal text-semantic-theme-yellow-bold',
    },
    {
      variant: 'outline',
      color: 'orange',
      class:
        'border-semantic-theme-orange-alternative text-semantic-theme-orange-normal',
    },
  ],
});

type BadgeVariant = NonNullable<VariantProps<typeof badgeVariants>['variant']>;
type BadgeColor = NonNullable<VariantProps<typeof badgeVariants>['color']>;

type BadgeProps = ComponentPropsWithoutRef<'span'> & {
  variant: BadgeVariant;
  color: BadgeColor;
};

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { className, variant, color, ...props },
  ref,
) {
  return (
    <span
      ref={ref}
      className={cn(badgeVariants({ variant, color }), className)}
      {...props}
    />
  );
});

export default Badge;
