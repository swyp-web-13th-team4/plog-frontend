import { type RefCallback } from 'react';
import { useController } from 'react-hook-form';

import { Field, Input } from '@plog/ui';

import { useMergedRef } from '@/shared/lib/merge-ref';

import { type CreateLogFormValues } from '../../model/types';

type LogTitleFieldProps = {
  fieldRef: RefCallback<HTMLDivElement>;
  inputRef: RefCallback<HTMLInputElement>;
};

export default function LogTitleField({
  fieldRef,
  inputRef,
}: LogTitleFieldProps) {
  const {
    field,
    fieldState: { error },
  } = useController<CreateLogFormValues, 'title'>({ name: 'title' });
  const inputMergedRef = useMergedRef<HTMLInputElement>(field.ref, inputRef);

  return (
    <div ref={fieldRef}>
      <Field label="제목" required error={error?.message}>
        <Input
          name={field.name}
          ref={inputMergedRef}
          value={field.value}
          onChange={(event) => {
            field.onChange(event.currentTarget.value.trimStart());
          }}
          onBlur={(event) => {
            field.onChange(event.currentTarget.value.trim());
          }}
          onClear={() => field.onChange('')}
          placeholder="제목을 입력해 주세요."
          maxLength={20}
        />
      </Field>
    </div>
  );
}
