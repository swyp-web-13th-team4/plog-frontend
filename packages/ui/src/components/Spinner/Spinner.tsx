import { type ComponentPropsWithoutRef } from 'react';

type SpinnerProps = Omit<
  ComponentPropsWithoutRef<'span'>,
  'className' | 'style'
> & {
  color?: 'white' | 'gray';
  size?: 'small' | 'large';
};

export default function Spinner({
  color = 'gray',
  size = 'small',
  ...props
}: SpinnerProps) {
  const spinnerColor =
    color === 'white'
      ? 'var(--color-semantic-system-white)'
      : 'var(--color-semantic-object-normal)';
  const maskSize = size === 'small' ? 2.67 : 4;
  const sizeClass = size === 'small' ? 'size-4' : 'size-8';

  return (
    <span
      className={`block animate-spin rounded-full ${sizeClass}`}
      style={{
        background: `conic-gradient(from 90deg at 50% 50%, transparent 0%, ${spinnerColor} 100%)`,
        WebkitMask: `radial-gradient(farthest-side, transparent calc(100% - ${maskSize}px), white calc(100% - ${maskSize}px))`,
        mask: `radial-gradient(farthest-side, transparent calc(100% - ${maskSize}px), white calc(100% - ${maskSize}px))`,
      }}
      {...props}
    />
  );
}
