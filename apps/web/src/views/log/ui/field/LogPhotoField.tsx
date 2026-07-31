import { type RefCallback } from 'react';

import { Field } from '@plog/ui';

import {
  type PhotoPreview,
  PhotoUploader,
  usePhotoUploadFeedback,
} from '@/features/photo-upload';

type LogPhotoFieldProps = {
  fieldRef: RefCallback<HTMLDivElement>;
  photoUploadButtonRef: RefCallback<HTMLButtonElement>;
  photos: PhotoPreview[];
  onAddPhotos: (files: File[]) => void;
  onRemovePhoto: (id: string) => void;
};

export default function LogPhotoField({
  fieldRef,
  photoUploadButtonRef,
  photos,
  onAddPhotos,
  onRemovePhoto,
}: LogPhotoFieldProps) {
  const {
    handlePhotoConversionFailed,
    handlePhotoFileSizeExceeded,
    handlePhotoMaxCountExceeded,
  } = usePhotoUploadFeedback();

  return (
    <div ref={fieldRef}>
      <Field label="사진 등록" required>
        <PhotoUploader
          photos={photos}
          uploadButtonRef={photoUploadButtonRef}
          onAdd={onAddPhotos}
          onRemove={onRemovePhoto}
          onFileSizeExceeded={handlePhotoFileSizeExceeded}
          onMaxCountExceeded={handlePhotoMaxCountExceeded}
          onConversionFailed={handlePhotoConversionFailed}
        />
      </Field>
    </div>
  );
}
