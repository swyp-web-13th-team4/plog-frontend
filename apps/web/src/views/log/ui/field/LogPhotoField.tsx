import { type RefCallback, useCallback } from 'react';
import { useController, useFormContext, useFormState } from 'react-hook-form';

import { Field } from '@plog/ui';

import {
  PhotoUploader,
  usePhotoUpload,
  usePhotoUploadFeedback,
} from '@/features/photo-upload';

import { type CreateLogFormValues } from '../../model/types';

type LogPhotoFieldProps = {
  fieldRef: RefCallback<HTMLDivElement>;
  photoUploadButtonRef: RefCallback<HTMLButtonElement>;
};

export default function LogPhotoField({
  fieldRef,
  photoUploadButtonRef,
}: LogPhotoFieldProps) {
  const { control, setValue } = useFormContext<CreateLogFormValues>();
  const { isSubmitted } = useFormState({ control });
  const {
    field: { value: photos },
  } = useController({
    control,
    name: 'photos',
  });
  const handlePhotoChange = useCallback(
    (nextPhotos: CreateLogFormValues['photos']) => {
      setValue('photos', nextPhotos, {
        shouldValidate: isSubmitted,
      });
    },
    [isSubmitted, setValue],
  );
  const { handleAddPhotos, handleRemovePhoto } = usePhotoUpload({
    photos,
    onPhotosChange: handlePhotoChange,
  });
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
          onAdd={handleAddPhotos}
          onRemove={handleRemovePhoto}
          onFileSizeExceeded={handlePhotoFileSizeExceeded}
          onMaxCountExceeded={handlePhotoMaxCountExceeded}
          onConversionFailed={handlePhotoConversionFailed}
        />
      </Field>
    </div>
  );
}
