import { type ComponentPropsWithoutRef, type Ref } from 'react';

import { cn } from '@plog/utils';
import { cva } from 'class-variance-authority';

import { type BadgeColor, type BadgeVariant } from './Badge.types';

const badgeVariants = cva(
  'inline-flex items-center h-5 px-1.5 caption-md rounded-sm',
  {
    variants: {
      variant: {
        solid: 'text-semantic-system-white',
        soft: '',
        outline: 'bg-semantic-system-white',
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
        class:
          'bg-semantic-theme-yellow-subtle text-semantic-theme-yellow-bold',
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
        class:
          'shadow-[inset_0_0_0_1px_var(--color-semantic-stroke-subtle)] text-semantic-object-normal',
      },
      {
        variant: 'outline',
        color: 'skyblue',
        class:
          'shadow-[inset_0_0_0_1px_var(--color-semantic-theme-sky-alternative)] text-semantic-theme-sky-normal',
      },
      {
        variant: 'outline',
        color: 'green',
        class:
          'shadow-[inset_0_0_0_1px_var(--color-semantic-accent-alternative)] text-semantic-accent-normal',
      },
      {
        variant: 'outline',
        color: 'yellow',
        class:
          'shadow-[inset_0_0_0_1px_var(--color-semantic-theme-yellow-normal)] text-semantic-theme-yellow-bold',
      },
      {
        variant: 'outline',
        color: 'orange',
        class:
          'shadow-[inset_0_0_0_1px_var(--color-semantic-theme-orange-alternative)] text-semantic-theme-orange-normal',
      },
    ],
  },
);

type BadgeProps = ComponentPropsWithoutRef<'span'> & {
  variant: BadgeVariant;
  color: BadgeColor;
  ref?: Ref<HTMLSpanElement>;
};

function Badge({ ref, className, variant, color, ...props }: BadgeProps) {
  return (
    <span
      ref={ref}
      className={cn(badgeVariants({ variant, color }), className)}
      {...props}
    />
  );
}

export default Badge;
