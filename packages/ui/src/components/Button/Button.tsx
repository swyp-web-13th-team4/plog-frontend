import {
  type ComponentPropsWithoutRef,
  type ComponentRef,
  type ReactNode,
  type Ref,
} from 'react';

import { Button as BaseButton } from '@base-ui/react/button';
import { cn } from '@plog/utils';
import { cva } from 'class-variance-authority';

import { Spinner } from '@/components/Spinner';

import { type ButtonSize, type ButtonVariant } from './Button.types';

const buttonVariants = cva(
  'inline-flex cursor-pointer items-center justify-center transition-colors disabled:cursor-not-allowed focus-visible:outline-2',
  {
    variants: {
      variant: {
        primary:
          'bg-semantic-accent-normal text-semantic-object-inverse hover:bg-semantic-accent-neutral active:bg-semantic-accent-bold disabled:bg-semantic-object-subtle focus-visible:outline-semantic-accent-subtle',
        secondary:
          'bg-semantic-object-subtler text-semantic-object-bold hover:bg-semantic-bg-deep hover:text-semantic-object-normal active:bg-semantic-object-subtle active:text-semantic-object-bold disabled:bg-semantic-object-subtler disabled:text-semantic-object-subtle focus-visible:outline-semantic-stroke-subtle',
        outline:
          'border border-semantic-stroke-assistive bg-semantic-system-white text-semantic-object-normal hover:bg-semantic-bg-deep active:bg-semantic-object-subtler disabled:bg-semantic-bg-deeper disabled:text-semantic-object-subtle focus-visible:outline-semantic-stroke-subtle',
      },
      size: {
        large:
          'label-lg rounded-[12px] px-5 py-3 gap-2.5 [&>svg]:size-6 focus-visible:outline-offset-2',
        medium:
          'label-md rounded-[12px] px-4 py-3 gap-2 [&>svg]:size-5 focus-visible:outline-offset-2',
        small:
          'label-sm rounded-[8px] px-3 py-2 gap-1.5 [&>svg]:size-4 focus-visible:outline-offset-1',
      },
      fullWidth: {
        true: 'w-full',
      },
      loading: {
        true: 'cursor-wait',
      },
    },
    compoundVariants: [
      {
        variant: 'primary',
        loading: true,
        class: 'bg-semantic-accent-neutral active:bg-semantic-accent-neutral',
      },
      {
        variant: 'secondary',
        loading: true,
        class:
          'bg-semantic-bg-deep text-semantic-object-normal active:bg-semantic-bg-deep active:text-semantic-object-normal',
      },
      {
        variant: 'outline',
        loading: true,
        class: 'bg-semantic-bg-deep active:bg-semantic-bg-deep',
      },
    ],
    defaultVariants: {
      variant: 'primary',
      size: 'medium',
      fullWidth: false,
      loading: false,
    },
  },
);

type ButtonProps = Omit<
  ComponentPropsWithoutRef<typeof BaseButton>,
  'className'
> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  loading?: boolean;
  className?: string;
  ref?: Ref<ComponentRef<typeof BaseButton>>;
};

function Button({
  ref,
  variant,
  size,
  children,
  iconLeft,
  iconRight,
  loading,
  disabled,
  fullWidth,
  className,
  type = 'button',
  ...props
}: ButtonProps) {
  const effectiveVariant = variant ?? 'primary';
  const effectiveLoading = !disabled && !!loading;

  const spinnerColor: ComponentPropsWithoutRef<typeof Spinner>['color'] =
    effectiveVariant === 'primary' ? 'white' : 'gray';

  return (
    <BaseButton
      ref={ref}
      className={cn(
        buttonVariants({
          variant,
          size,
          fullWidth,
          loading: effectiveLoading,
        }),
        className,
      )}
      type={type}
      disabled={loading || disabled}
      focusableWhenDisabled={effectiveLoading}
      aria-busy={effectiveLoading}
      {...props}
    >
      {effectiveLoading && <Spinner color={spinnerColor} />}
      {iconLeft}
      {children}
      {iconRight}
    </BaseButton>
  );
}

export default Button;
