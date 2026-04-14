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
  className?: string;
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
          className,
        )
      }
      indeterminate={indeterminate}
      {...props}
    >
      <BasicCheckbox.Indicator
        className={(state) =>
          cn(
            'pointer-events-none flex size-3 items-center justify-center transition-all duration-150',
            state.checked || state.indeterminate
              ? 'scale-100 opacity-100'
              : 'scale-75 opacity-0',
          )
        }
      >
        {indeterminate ? (
          <MinusIcon className="size-3" aria-hidden="true" />
        ) : (
          <CheckIcon className="size-3" aria-hidden="true" />
        )}
      </BasicCheckbox.Indicator>
    </BasicCheckbox.Root>
  );
});

export default Checkbox;
