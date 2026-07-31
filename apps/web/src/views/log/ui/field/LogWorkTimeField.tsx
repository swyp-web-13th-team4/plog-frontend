import { type RefCallback, useCallback } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import { Field, Icon, type TimeValue } from '@plog/ui';

import { SelectTriggerButton } from '@/features/select-trigger-button';
import { WorkTimeDialog } from '@/features/select-work-time';

import { formatTime } from '@/shared/lib/datetime';

import { type CreateLogFormValues } from '../../model/types';

type LogWorkTimeName = 'startedAt' | 'endedAt';

type LogWorkTimeFieldProps = {
  name: LogWorkTimeName;
  label: string;
  buttonRef: RefCallback<HTMLButtonElement>;
  revalidateField?: LogWorkTimeName;
};

export default function LogWorkTimeField({
  name,
  label,
  buttonRef,
  revalidateField,
}: LogWorkTimeFieldProps) {
  const { trigger } = useFormContext<CreateLogFormValues>();
  const { field } = useController<CreateLogFormValues, LogWorkTimeName>({
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
  const handleChange = (value: TimeValue) => {
    field.onChange(value);

    if (revalidateField) {
      void trigger(revalidateField);
    }
  };

  return (
    <Field label={label} required>
      <WorkTimeDialog label={label} value={field.value} onChange={handleChange}>
        <SelectTriggerButton
          ref={setButtonRef}
          value={field.value ? formatTime(field.value, '24h') : null}
          placeholder="--:--"
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
