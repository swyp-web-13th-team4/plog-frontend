import Image from 'next/image';

import { type ReviewFocusTargets } from '../model/use-invalid-form-focus';
import ReviewRatingField from './field/ReviewRatingField';

type ReviewRatingSectionProps = {
  placeName: string;
  placeImageSrc: string | null;
  focusTargets: Pick<
    ReviewFocusTargets,
    'ratingFieldRef' | 'ratingFirstButtonRef'
  >;
};

export default function ReviewRatingSection({
  placeName,
  placeImageSrc,
  focusTargets,
}: ReviewRatingSectionProps) {
  const { ratingFieldRef, ratingFirstButtonRef } = focusTargets;

  return (
    <section className="px-6 pt-8 pb-10">
      <div
        ref={ratingFieldRef}
        className="flex flex-col items-center justify-center gap-8"
      >
        <div className="relative size-30 overflow-hidden rounded-xl bg-semantic-object-subtler">
          {placeImageSrc && (
            <Image
              src={placeImageSrc}
              alt={placeName}
              fill
              priority
              sizes="120px"
              className="object-cover"
            />
          )}
        </div>

        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <span className="label-xl text-semantic-object-boldest">
              이곳에서의 경험은 어떠셨나요?
            </span>
            <p className="title-lg text-semantic-object-boldest">{placeName}</p>
          </div>
          <ReviewRatingField buttonRef={ratingFirstButtonRef} />
        </div>
      </div>
    </section>
  );
}
