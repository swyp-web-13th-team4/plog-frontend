import { Field, Textarea } from '@plog/ui';

import { PhotoUploader } from '@/features/photo-upload';

import { type ReviewFormController } from '../model/use-create-review-page';

export default function ReviewContentSection({
  controller,
}: {
  controller: ReviewFormController;
}) {
  const {
    contentsField,
    handleAddPhotos,
    handlePhotoConversionFailed,
    handlePhotoFileSizeExceeded,
    handlePhotoMaxCountExceeded,
    handleRemovePhoto,
    photos,
    reviewText,
  } = controller;

  return (
    <section className="flex flex-col gap-6 px-6 pt-6 pb-10">
      <div>
        <Field label="더 자세한 후기를 남겨주세요">
          <Textarea
            {...contentsField}
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
        <Field label="사진 등록">
          <PhotoUploader
            photos={photos}
            onAdd={handleAddPhotos}
            onRemove={handleRemovePhoto}
            onFileSizeExceeded={handlePhotoFileSizeExceeded}
            onMaxCountExceeded={handlePhotoMaxCountExceeded}
            onConversionFailed={handlePhotoConversionFailed}
          />
        </Field>
      </div>
    </section>
  );
}
