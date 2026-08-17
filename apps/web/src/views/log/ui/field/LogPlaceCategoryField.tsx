import { type RefCallback } from 'react';
import { useController } from 'react-hook-form';

import { Field, Icon } from '@plog/ui';

import { PlaceCategorySheet } from '@/features/select-place-category';
import { SelectTriggerButton } from '@/features/select-trigger-button';

import { PLACE_CATEGORIES } from '@/entities/place';

import { useMergedRef } from '@/shared/lib/merge-ref';

import { type CreateLogFormValues } from '../../model/types';

type LogPlaceCategoryFieldProps = {
  buttonRef: RefCallback<HTMLButtonElement>;
  fieldRef: RefCallback<HTMLDivElement>;
};

export default function LogPlaceCategoryField({
  buttonRef,
  fieldRef,
}: LogPlaceCategoryFieldProps) {
  const {
    field,
    fieldState: { invalid },
  } = useController<CreateLogFormValues, 'categoryCode'>({
    name: 'categoryCode',
  });
  const buttonMergedRef = useMergedRef<HTMLButtonElement>(field.ref, buttonRef);

  return (
    <div ref={fieldRef}>
      <Field>
        <PlaceCategorySheet value={field.value} onChange={field.onChange}>
          <SelectTriggerButton
            ref={buttonMergedRef}
            invalid={invalid}
            value={
              PLACE_CATEGORIES.find(
                (category) => category.value === field.value,
              )?.label ?? null
            }
            placeholder="장소 카테고리를 선택해 주세요."
            icon={
              <Icon
                name="chevron-right"
                size={20}
                className="text-semantic-object-subtle"
              />
            }
          />
        </PlaceCategorySheet>
      </Field>
    </div>
  );
}
