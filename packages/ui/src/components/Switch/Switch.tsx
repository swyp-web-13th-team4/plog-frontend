import {
  type ComponentPropsWithoutRef,
  type ComponentRef,
  type Ref,
} from 'react';

import { Switch as BaseSwitch } from '@base-ui/react/switch';
import { cn } from '@plog/utils';

type SwitchProps = Omit<
  ComponentPropsWithoutRef<typeof BaseSwitch.Root>,
  'className' | 'children'
> & {
  className?: string;
  ref?: Ref<ComponentRef<typeof BaseSwitch.Root>>;
};

function Switch({ ref, className, ...props }: SwitchProps) {
  return (
    <BaseSwitch.Root
      ref={ref}
      className={cn(
        'inline-flex h-5 w-10 cursor-pointer items-center rounded-full bg-semantic-object-subtle p-0.75 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-semantic-accent-normal',
        'data-checked:bg-semantic-accent-normal',
        'data-disabled:cursor-not-allowed data-disabled:bg-semantic-object-subtler',
        className,
      )}
      {...props}
    >
      <BaseSwitch.Thumb
        className={cn(
          'block size-3.5 rounded-full bg-semantic-object-inverse transition-transform duration-200',
          'data-checked:translate-x-5',
          'data-disabled:bg-semantic-object-subtle',
        )}
      />
    </BaseSwitch.Root>
  );
}

export default Switch;
