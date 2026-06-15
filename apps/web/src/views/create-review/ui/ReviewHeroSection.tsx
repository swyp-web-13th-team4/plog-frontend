import Image from 'next/image';

import { type ReviewFormController } from '../model/use-create-review-page';
import RatingSelector from './RatingSelector';

export default function ReviewHeroSection({
  controller,
}: {
  controller: ReviewFormController;
}) {
  const { focusTargets, placeImageSrc, placeName, rating, setRating } =
    controller;
  const { ratingFieldRef, ratingFirstButtonRef } = focusTargets;

  return (
    <section ref={ratingFieldRef} className="px-6 pt-8 pb-10">
      <div className="flex flex-col items-center justify-center gap-8">
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
          <RatingSelector
            value={rating ?? 0}
            focusFirstButton={ratingFirstButtonRef}
            onChange={setRating}
          />
        </div>
      </div>
    </section>
  );
}
