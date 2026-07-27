import { type RefCallback, useCallback } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import { Field, Icon } from '@plog/ui';

import { PlaceCategorySheet } from '@/features/select-place-category';
import { SelectTriggerButton } from '@/features/select-trigger-button';

import { PLACE_CATEGORIES } from '@/entities/place';

import { CreateLogFormValues } from '../model/types';

type PlaceCategoryFieldProps = {
  buttonRef: RefCallback<HTMLButtonElement>;
  fieldRef: RefCallback<HTMLDivElement>;
};

export default function LogPlaceCategoryField({
  buttonRef,
  fieldRef,
}: PlaceCategoryFieldProps) {
  const { control } = useFormContext<CreateLogFormValues>();
  const { field } = useController({
    control,
    name: 'categoryCode',
  });
  const { ref: rhfRef } = field;
  const setButtonRef = useCallback(
    (element: HTMLButtonElement | null) => {
      rhfRef(element);
      buttonRef(element);
    },
    [buttonRef, rhfRef],
  );

  return (
    <div ref={fieldRef}>
      <Field>
        <PlaceCategorySheet
          name={field.name}
          value={field.value}
          onChange={field.onChange}
        >
          <SelectTriggerButton
            ref={setButtonRef}
            value={
              PLACE_CATEGORIES.find(
                (category) => category.value === field.value,
              )?.label ?? null
            }
            placeholder="장소 카테고리를 선택해 주세요."
            onBlur={field.onBlur}
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
