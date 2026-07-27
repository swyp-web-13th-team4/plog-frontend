import { type RefCallback, useCallback } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import { Field, Input } from '@plog/ui';

import { type CreateLogFormValues } from '../model/types';

type LogTitleFieldProps = {
  fieldRef: RefCallback<HTMLDivElement>;
  inputRef: RefCallback<HTMLInputElement>;
};

export default function LogTitleField({
  fieldRef,
  inputRef,
}: LogTitleFieldProps) {
  const { control } = useFormContext<CreateLogFormValues>();
  const {
    field,
    fieldState: { error },
  } = useController({ control, name: 'title' });
  const { ref: rhfRef } = field;
  const setInputRef = useCallback(
    (element: HTMLInputElement | null) => {
      rhfRef(element);
      inputRef(element);
    },
    [rhfRef, inputRef],
  );

  return (
    <div ref={fieldRef}>
      <Field label="제목" required error={error?.message}>
        <Input
          name={field.name}
          ref={setInputRef}
          value={field.value}
          onChange={(event) => {
            field.onChange(event.currentTarget.value.trimStart());
          }}
          onBlur={(event) => {
            field.onChange(event.currentTarget.value.trim());
            field.onBlur();
          }}
          onClear={() => field.onChange('')}
          placeholder="제목을 입력해 주세요."
          maxLength={20}
        />
      </Field>
    </div>
  );
}
