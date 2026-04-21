import {
  type ComponentPropsWithoutRef,
  type ComponentRef,
  type Ref,
} from 'react';

import { Checkbox as BasicCheckbox } from '@base-ui/react/checkbox';
import { cn } from '@plog/utils';

import CheckIcon from '@/assets/check.svg?react';
import MinusIcon from '@/assets/minus.svg?react';
import { getCheckboxStateClass } from '@/utils/getCheckboxStateClass';

type CheckboxProps = Omit<
  ComponentPropsWithoutRef<typeof BasicCheckbox.Root>,
  'children' | 'className' | 'render'
> & {
  className?: string;
  ref?: Ref<ComponentRef<typeof BasicCheckbox.Root>>;
};

function Checkbox({ ref, className, indeterminate, ...props }: CheckboxProps) {
  return (
    <BasicCheckbox.Root
      ref={ref}
      className={(state) =>
        cn(
          'inline-flex size-5 shrink-0 items-center justify-center rounded-sm border transition-colors',
          'focus-visible:outline-2 focus-visible:outline-offset-2',
          getCheckboxStateClass(state),
          className,
        )
      }
      indeterminate={indeterminate}
      {...props}
    >
      <BasicCheckbox.Indicator className="pointer-events-none flex size-3 items-center justify-center data-[unchecked]:hidden data-[indeterminate]:[&_[data-slot=check-icon]]:hidden data-[indeterminate]:[&_[data-slot=minus-icon]]:block">
        <CheckIcon
          data-slot="check-icon"
          className="size-3"
          aria-hidden="true"
        />
        <MinusIcon
          data-slot="minus-icon"
          className="hidden size-3"
          aria-hidden="true"
        />
      </BasicCheckbox.Indicator>
    </BasicCheckbox.Root>
  );
}

export default Checkbox;
