import { RefCallback, useCallback } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import { Field, Icon } from '@plog/ui';

import { SelectTriggerButton } from '@/features/select-trigger-button';
import { WorkTimeDialog } from '@/features/select-work-time';

import { formatTime } from '@/shared/lib/datetime';

import { CreateLogFormValues } from '../../model/types';

type LogWorkTimeName = 'startedAt' | 'endedAt';

type LogWorkTimeFieldProps = {
  name: LogWorkTimeName;
  label: string;
  buttonRef: RefCallback<HTMLButtonElement>;
  revalidateField?: LogWorkTimeName;
};

type LogWorkTimeValue = NonNullable<CreateLogFormValues[LogWorkTimeName]>;

export default function LogWorkTimeField({
  name,
  label,
  buttonRef,
  revalidateField,
}: LogWorkTimeFieldProps) {
  const { control, trigger } = useFormContext<CreateLogFormValues>();
  const { field } = useController<CreateLogFormValues, LogWorkTimeName>({
    control,
    name,
  });
  const { ref: rhfRef } = field;
  const setButtonRef = useCallback(
    (element: HTMLButtonElement | null) => {
      rhfRef(element);
      buttonRef(element);
    },
    [rhfRef, buttonRef],
  );
  const handleChange = (value: LogWorkTimeValue) => {
    field.onChange(value);

    if (revalidateField) {
      void trigger(revalidateField);
    }
  };

  return (
    <Field label={label} required>
      <WorkTimeDialog
        name={field.name}
        label={label}
        value={field.value}
        onChange={handleChange}
      >
        <SelectTriggerButton
          ref={setButtonRef}
          value={field.value ? formatTime(field.value, '24h') : null}
          placeholder="--:--"
          onBlur={field.onBlur}
          aria-label={`${label} 선택`}
          icon={
            <Icon
              name="clock"
              size={20}
              className="text-semantic-object-subtle"
            />
          }
        />
      </WorkTimeDialog>
    </Field>
  );
}
