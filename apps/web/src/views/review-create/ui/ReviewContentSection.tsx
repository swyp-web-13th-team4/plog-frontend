import { type CreateReviewFormValues } from '../model/types';
import ReviewContentsField from './field/ReviewContentsField';
import ReviewPhotoField from './field/ReviewPhotoField';

type ReviewContentSectionProps = {
  photos: CreateReviewFormValues['photos'];
  onAddPhotos: (files: File[]) => void;
  onRemovePhoto: (id: string) => void;
};

export default function ReviewContentSection({
  photos,
  onAddPhotos,
  onRemovePhoto,
}: ReviewContentSectionProps) {
  return (
    <section className="flex flex-col gap-6 px-6 pt-6 pb-10">
      <ReviewContentsField />

      <ReviewPhotoField
        photos={photos}
        onAddPhotos={onAddPhotos}
        onRemovePhoto={onRemovePhoto}
      />
    </section>
  );
}
