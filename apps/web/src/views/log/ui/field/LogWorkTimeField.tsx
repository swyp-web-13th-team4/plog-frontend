import { type RefCallback } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import { Field, Icon, type TimeValue } from '@plog/ui';

import { SelectTriggerButton } from '@/features/select-trigger-button';
import { WorkTimeDialog } from '@/features/select-work-time';

import { formatTime } from '@/shared/lib/datetime';
import { useMergedRef } from '@/shared/lib/merge-ref';

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
  const {
    field,
    fieldState: { invalid },
  } = useController<CreateLogFormValues, LogWorkTimeName>({
    name,
  });
  const buttonMergedRef = useMergedRef<HTMLButtonElement>(field.ref, buttonRef);
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
          ref={buttonMergedRef}
          invalid={invalid}
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
