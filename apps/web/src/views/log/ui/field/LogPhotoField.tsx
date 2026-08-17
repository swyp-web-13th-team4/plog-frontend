import { type RefCallback } from 'react';
import { useController } from 'react-hook-form';

import { Field } from '@plog/ui';

import { PhotoUploader, usePhotoUploadFeedback } from '@/features/photo-upload';

import { useMergedRef } from '@/shared/lib/merge-ref';

import { type CreateLogFormValues } from '../../model/types';

type LogPhotoFieldProps = {
  fieldRef: RefCallback<HTMLDivElement>;
  photoUploadButtonRef: RefCallback<HTMLButtonElement>;
  onAddPhotos: (files: File[]) => void;
  onRemovePhoto: (id: string) => void;
};

export default function LogPhotoField({
  fieldRef,
  photoUploadButtonRef,
  onAddPhotos,
  onRemovePhoto,
}: LogPhotoFieldProps) {
  const {
    field,
    fieldState: { invalid },
  } = useController<CreateLogFormValues, 'photos'>({
    name: 'photos',
  });

  const uploadButtonMergedRef = useMergedRef<HTMLButtonElement>(
    field.ref,
    photoUploadButtonRef,
  );

  const {
    handlePhotoConversionFailed,
    handlePhotoFileSizeExceeded,
    handlePhotoMaxCountExceeded,
  } = usePhotoUploadFeedback();

  return (
    <div ref={fieldRef}>
      <Field label="사진 등록" required>
        <PhotoUploader
          photos={field.value}
          invalid={invalid}
          uploadButtonRef={uploadButtonMergedRef}
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
