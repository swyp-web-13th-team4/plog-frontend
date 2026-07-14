import {
  type ComponentPropsWithoutRef,
  type ComponentRef,
  type Ref,
} from 'react';

import { Radio as BasicRadio } from '@base-ui/react/radio';
import { cn } from '@plog/utils';

import { getRadioStateClass } from './getRadioStateClass';

type RadioProps = Omit<
  ComponentPropsWithoutRef<typeof BasicRadio.Root>,
  'children' | 'className' | 'render'
> & {
  className?: string;
  ref?: Ref<ComponentRef<typeof BasicRadio.Root>>;
};

function Radio({ ref, className, ...props }: RadioProps) {
  return (
    <BasicRadio.Root
      ref={ref}
      className={(state) =>
        cn(
          'inline-flex size-5 shrink-0 items-center justify-center rounded-full border transition-colors',
          'focus-visible:outline-2 focus-visible:outline-offset-2',
          getRadioStateClass(state),
          className,
        )
      }
      {...props}
    >
      <BasicRadio.Indicator className="pointer-events-none size-2 rounded-full bg-current data-[unchecked]:hidden" />
    </BasicRadio.Root>
  );
}

export default Radio;
