import { type ComponentPropsWithoutRef, forwardRef } from 'react';

import { Checkbox as BasicCheckbox } from '@base-ui/react/checkbox';
import { cn } from '@plog/utils';

import CheckIcon from '@/assets/check.svg?react';
import MinusIcon from '@/assets/minus.svg?react';
import { getCheckboxRootClass } from '@/utils/getCheckboxStateClass';

type CheckboxProps = Omit<
  ComponentPropsWithoutRef<typeof BasicCheckbox.Root>,
  'children' | 'className' | 'render'
> & {
  className?: ComponentPropsWithoutRef<typeof BasicCheckbox.Root>['className'];
};

const Checkbox = forwardRef<HTMLElement, CheckboxProps>(function Checkbox(
  { className, indeterminate, ...props },
  ref,
) {
  return (
    <BasicCheckbox.Root
      ref={ref}
      className={(state) =>
        cn(
          'inline-flex size-5 shrink-0 items-center justify-center rounded-sm border transition-colors',
          'focus-visible:outline-2 focus-visible:outline-offset-2',
          getCheckboxRootClass(state),
          typeof className === 'function' ? className(state) : className,
        )
      }
      indeterminate={indeterminate}
      {...props}
    >
      <BasicCheckbox.Indicator
        className={(state) =>
          cn(
            'pointer-events-none flex size-3 items-center justify-center transition-all duration-150 data-[unchecked]:hidden',
            'data-[indeterminate]:[&_[data-slot=check-icon]]:hidden',
            'data-[indeterminate]:[&_[data-slot=minus-icon]]:block',
            state.checked || state.indeterminate
              ? 'scale-100 opacity-100'
              : 'scale-75 opacity-0',
          )
        }
      >
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
});

export default Checkbox;
