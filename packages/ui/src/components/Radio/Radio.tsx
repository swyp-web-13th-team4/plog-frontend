import { Radio as BasicRadio } from '@base-ui/react/radio';
import { cn } from '@plog/utils';

import { getRadioStateClass } from './getRadioStateClass';

type RadioProps = {
  id?: string;
  value: string;
  disabled?: boolean;
};

function Radio({ id, value, disabled }: RadioProps) {
  return (
    <BasicRadio.Root
      id={id}
      value={value}
      disabled={disabled}
      className={(state) =>
        cn(
          'inline-flex size-5 shrink-0 items-center justify-center rounded-full border',
          'focus-visible:outline-2 focus-visible:outline-offset-2',
          getRadioStateClass(state),
        )
      }
    >
      <BasicRadio.Indicator className="pointer-events-none size-2 rounded-full bg-current" />
    </BasicRadio.Root>
  );
}

export default Radio;
