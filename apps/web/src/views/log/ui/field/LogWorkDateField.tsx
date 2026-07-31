import { type RefCallback } from 'react';
import { useController } from 'react-hook-form';

import { Field, Icon } from '@plog/ui';

import { SelectTriggerButton } from '@/features/select-trigger-button';
import { WorkDateDialog } from '@/features/select-work-date';

import { formatDate } from '@/shared/lib/datetime';
import { useMergedRef } from '@/shared/lib/merge-ref';

import { type CreateLogFormValues } from '../../model/types';

type LogWorkDateFieldProps = {
  fieldRef: RefCallback<HTMLDivElement>;
  buttonRef: RefCallback<HTMLButtonElement>;
};

export default function LogWorkDateField({
  fieldRef,
  buttonRef,
}: LogWorkDateFieldProps) {
  const { field } = useController<CreateLogFormValues, 'studyDate'>({
    name: 'studyDate',
  });
  const buttonMergedRef = useMergedRef<HTMLButtonElement>(field.ref, buttonRef);

  return (
    <div ref={fieldRef}>
      <Field label="작업 날짜" required>
        <WorkDateDialog value={field.value} onChange={field.onChange}>
          <SelectTriggerButton
            ref={buttonMergedRef}
            value={field.value ? formatDate(field.value, 'dot') : null}
            placeholder="YYYY.MM.DD"
            icon={
              <Icon
                name="calendar"
                size={20}
                className="text-semantic-object-subtle"
              />
            }
            aria-label="작업 날짜 선택"
          />
        </WorkDateDialog>
      </Field>
    </div>
  );
}
