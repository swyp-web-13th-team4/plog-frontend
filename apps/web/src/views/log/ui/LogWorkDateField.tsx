import { RefCallback, useCallback } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import { Field, Icon } from '@plog/ui';

import { SelectTriggerButton } from '@/features/select-trigger-button';
import { WorkDateDialog } from '@/features/select-work-date';

import { formatDate } from '@/shared/lib/datetime';

import { CreateLogFormValues } from '../model/types';

type LogWorkDateFieldProps = {
  inputRef: RefCallback<HTMLDivElement>;
  buttonRef: RefCallback<HTMLButtonElement>;
};

export default function LogWorkDateField({
  inputRef,
  buttonRef,
}: LogWorkDateFieldProps) {
  const { control } = useFormContext<CreateLogFormValues>();
  const { field } = useController({
    control,
    name: 'studyDate',
  });
  const { ref: rhfRef } = field;
  const setButtonRef = useCallback(
    (element: HTMLButtonElement | null) => {
      rhfRef(element);
      buttonRef(element);
    },
    [rhfRef, buttonRef],
  );

  return (
    <div ref={inputRef}>
      <Field label="작업 날짜" required>
        <WorkDateDialog
          name={field.name}
          value={field.value}
          onChange={field.onChange}
        >
          <SelectTriggerButton
            ref={setButtonRef}
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
