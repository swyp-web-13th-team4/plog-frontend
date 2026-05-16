'use client';

import { AppBar, Button } from '@plog/ui';

import { useReviewPage } from '../model/use-review-page';
import ReviewContentSection from './ReviewContentSection';
import ReviewEnvironmentSection from './ReviewEnvironmentSection';
import ReviewHeroSection from './ReviewHeroSection';
import ReviewVisitSection from './ReviewVisitSection';
import SectionDivider from './SectionDivider';

type ReviewPageProps = {
  postId: string;
};

export default function ReviewPage({ postId }: ReviewPageProps) {
  const controller = useReviewPage({ postId });
  const { handleBack, handleSubmitReview, rating } = controller;

  return (
    <>
      <header>
        <AppBar variant="navigation" title="장소 리뷰" onBack={handleBack} />
      </header>

      <form className="flex flex-col" onSubmit={handleSubmitReview}>
        <input type="hidden" name="postId" value={postId} />
        <input type="hidden" name="rating" value={rating ?? ''} />

        <ReviewHeroSection controller={controller} />
        <SectionDivider />
        <ReviewVisitSection controller={controller} />
        <SectionDivider />
        <ReviewEnvironmentSection controller={controller} />
        <SectionDivider />
        <ReviewContentSection controller={controller} />

        <section className="px-6 pt-6 pb-18">
          <Button type="submit" size="large" fullWidth>
            리뷰 등록하기
          </Button>
        </section>
      </form>
    </>
  );
}
