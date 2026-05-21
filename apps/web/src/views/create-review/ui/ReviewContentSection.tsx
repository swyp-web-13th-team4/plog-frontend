import { useCallback } from 'react';

import { Field, Textarea } from '@plog/ui';

import { PhotoUploader } from '@/features/photo-upload';

import { type ReviewFormController } from '../model/use-create-review-page';

type ReviewContentSectionProps = {
  controller: ReviewFormController;
};

export default function ReviewContentSection({
  controller,
}: ReviewContentSectionProps) {
  const {
    contentsField,
    handleAddPhotos,
    handlePhotoConversionFailed,
    handlePhotoFileSizeExceeded,
    handleRemovePhoto,
    photos,
    reviewText,
  } = controller;
  const { ref: contentsFormRef } = contentsField;

  const setContentsRef = useCallback(
    (element: HTMLTextAreaElement | null) => {
      contentsFormRef(element);
    },
    [contentsFormRef],
  );

  return (
    <section className="flex flex-col gap-5 px-6 pt-6 pb-10">
      <div>
        <Field label="더 자세한 후기를 남겨주세요">
          <Textarea
            {...contentsField}
            ref={setContentsRef}
            value={reviewText}
            maxLength={300}
            placeholder={
              '자유롭게 내용을 입력해 주세요. (300자 이내)\n부적절하거나 불쾌감을 줄 수 있는 내용은 제재를 받을 수 있습니다.'
            }
            className="h-40"
          />
        </Field>
      </div>

      <div>
        <Field label="이미지">
          <PhotoUploader
            photos={photos}
            onAdd={handleAddPhotos}
            onRemove={handleRemovePhoto}
            onFileSizeExceeded={handlePhotoFileSizeExceeded}
            onConversionFailed={handlePhotoConversionFailed}
          />
        </Field>
      </div>
    </section>
  );
}
