import { RefCallback, useCallback } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import { Button, Chip, Field, Icon } from '@plog/ui';

import { ReviewTagsSheet } from '@/features/select-review-tags';

import { PLACE_TAG_LABELS } from '@/entities/feed';

import { CreateLogFormValues } from '../model/types';

type ReviewTag = CreateLogFormValues['placeTags'][number];

type LogSelectReviewTagsFieldProps = {
  fieldRef: RefCallback<HTMLDivElement>;
  buttonRef: RefCallback<HTMLButtonElement>;
};

export default function LogSelectReviewTagsField({
  fieldRef,
  buttonRef,
}: LogSelectReviewTagsFieldProps) {
  const { control } = useFormContext<CreateLogFormValues>();
  const { field } = useController({
    control,
    name: 'placeTags',
  });
  const { ref: rhfRef } = field;
  const setButtonRef = useCallback(
    (element: HTMLButtonElement | null) => {
      buttonRef(element);
      rhfRef(element);
    },
    [rhfRef, buttonRef],
  );
  const handleRemoveTag = (tag: ReviewTag) => {
    field.onChange(field.value.filter((selectedTag) => selectedTag !== tag));
  };

  return (
    <div
      ref={fieldRef}
      className="flex flex-col gap-4 border-b border-semantic-stroke-subtler pb-6"
    >
      <Field label="후기 요약 태그를 선택해 주세요" required>
        <>
          {field.value.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {field.value.map((tag) => (
                <Chip
                  key={tag}
                  size="small"
                  variant="soft"
                  pressed
                  onClick={() => handleRemoveTag(tag)}
                >
                  {PLACE_TAG_LABELS[tag]}
                  <Icon name="close" size={16} />
                </Chip>
              ))}
            </div>
          )}

          <ReviewTagsSheet
            name={field.name}
            value={field.value}
            onChange={field.onChange}
          >
            <Button
              ref={setButtonRef}
              variant="outline"
              size="large"
              fullWidth
              onBlur={field.onBlur}
              iconLeft={<Icon name="plus" />}
              className="text-semantic-object-normal [&>svg]:size-4!"
            >
              태그 추가하기
            </Button>
          </ReviewTagsSheet>
        </>
      </Field>
    </div>
  );
}
