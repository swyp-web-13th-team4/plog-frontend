import { cn } from '@plog/utils';

interface SpinnerProps {
  className?: string;
}

export default function Spinner({ className }: SpinnerProps) {
  return (
    <span
      className={cn('block animate-spin rounded-full', className)}
      style={{
        background:
          'conic-gradient(from 90deg at 50% 50%, transparent 0%, currentColor 100%)',
        WebkitMask:
          'radial-gradient(farthest-side, transparent calc(100% - 2.67px), white calc(100% - 2.67px))',
        mask: 'radial-gradient(farthest-side, transparent calc(100% - 2.67px), white calc(100% - 2.67px))',
      }}
    />
  );
}
