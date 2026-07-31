import { type RefCallback } from 'react';
import { useController } from 'react-hook-form';

import { Field, Textarea } from '@plog/ui';

import { useMergedRef } from '@/shared/lib/merge-ref';

import { type CreateLogFormValues } from '../../model/types';

type LogContentsFieldProps = {
  fieldRef: RefCallback<HTMLDivElement>;
  textareaRef: RefCallback<HTMLTextAreaElement>;
};

export default function LogContentsField({
  fieldRef,
  textareaRef,
}: LogContentsFieldProps) {
  const {
    field,
    fieldState: { error },
  } = useController<CreateLogFormValues, 'contents'>({ name: 'contents' });
  const textareaMergeRef = useMergedRef<HTMLTextAreaElement>(
    field.ref,
    textareaRef,
  );

  return (
    <div ref={fieldRef}>
      <Field label="환경 기록을 작성해 주세요" required error={error?.message}>
        <Textarea
          name={field.name}
          ref={textareaMergeRef}
          value={field.value}
          onChange={(event) => {
            field.onChange(event.currentTarget.value.trimStart());
          }}
          onBlur={(event) => {
            field.onChange(event.currentTarget.value.trim());
          }}
          placeholder={`자유롭게 내용을 입력해 주세요. (300자 이내)\n부적절하거나 불쾌감을 줄 수 있는 내용은 제재를 받을 수 있습니다.`}
          maxLength={300}
          className="[&_textarea]:body-sm"
        />
      </Field>
    </div>
  );
}
