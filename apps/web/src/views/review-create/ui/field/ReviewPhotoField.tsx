import { Field } from '@plog/ui';

import {
  type PhotoPreview,
  PhotoUploader,
  usePhotoUploadFeedback,
} from '@/features/photo-upload';

type ReviewPhotoFieldProps = {
  photos: PhotoPreview[];
  onAddPhotos: (files: File[]) => void;
  onRemovePhoto: (id: string) => void;
};

export default function ReviewPhotoField({
  photos,
  onAddPhotos,
  onRemovePhoto,
}: ReviewPhotoFieldProps) {
  const {
    handlePhotoConversionFailed,
    handlePhotoFileSizeExceeded,
    handlePhotoMaxCountExceeded,
  } = usePhotoUploadFeedback();

  return (
    <Field label="사진 등록">
      <PhotoUploader
        photos={photos}
        onAdd={onAddPhotos}
        onRemove={onRemovePhoto}
        onFileSizeExceeded={handlePhotoFileSizeExceeded}
        onMaxCountExceeded={handlePhotoMaxCountExceeded}
        onConversionFailed={handlePhotoConversionFailed}
      />
    </Field>
  );
}
