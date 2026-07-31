import { type RefCallback, useCallback } from 'react';
import { useController } from 'react-hook-form';

import { Field, Input } from '@plog/ui';

import { type CreateLogFormValues } from '../../model/types';

type LogPlaceFieldProps = {
  fieldRef: RefCallback<HTMLDivElement>;
  inputRef: RefCallback<HTMLInputElement>;
  onOpenPlaceSearch: () => void;
};

export default function LogPlaceField({
  fieldRef,
  inputRef,
  onOpenPlaceSearch,
}: LogPlaceFieldProps) {
  const { field } = useController<CreateLogFormValues, 'place'>({
    name: 'place',
  });
  const { ref: rhfRef } = field;
  const setInputRef = useCallback(
    (element: HTMLInputElement | null) => {
      rhfRef(element);
      inputRef(element);
    },
    [inputRef, rhfRef],
  );

  return (
    <div ref={fieldRef}>
      <Field label="작업 장소" required>
        <Input
          name={field.name}
          ref={setInputRef}
          value={field.value?.name ?? ''}
          placeholder="위치를 입력해 주세요."
          readOnly
          onClear={() => field.onChange(null)}
          onClick={onOpenPlaceSearch}
          className="cursor-pointer"
        />
      </Field>
    </div>
  );
}
