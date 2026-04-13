import { type ComponentProps, forwardRef } from 'react';

import { Switch as BaseSwitch } from '@base-ui/react/switch';
import { cn } from '@plog/utils';

type SwitchProps = ComponentProps<typeof BaseSwitch.Root>;

const Switch = forwardRef<HTMLElement, SwitchProps>(function Switch(
  { className, ...props },
  ref,
) {
  return (
    <BaseSwitch.Root
      ref={ref}
      className={cn(
        'inline-flex h-5 w-10 cursor-pointer items-center rounded-full bg-semantic-object-subtle p-0.75 transition-colors outline-none',
        'data-checked:bg-semantic-accent-normal',
        'data-disabled:cursor-not-allowed data-disabled:bg-semantic-object-subtler',
        className,
      )}
      {...props}
    >
      <BaseSwitch.Thumb
        className={cn(
          'block size-3.5 rounded-full bg-semantic-system-white transition-transform duration-200',
          'data-checked:translate-x-5',
          'data-disabled:bg-semantic-object-subtle',
        )}
      />
    </BaseSwitch.Root>
  );
});

export default Switch;
