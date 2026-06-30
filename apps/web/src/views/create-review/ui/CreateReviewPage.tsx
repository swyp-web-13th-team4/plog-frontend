'use client';

import { AppBar, Button } from '@plog/ui';

import { useCreateReviewPage } from '../model/use-create-review-page';
import LeaveReviewDialog from './LeaveReviewDialog';
import ReviewContentSection from './ReviewContentSection';
import ReviewEnvironmentSection from './ReviewEnvironmentSection';
import ReviewHeroSection from './ReviewHeroSection';
import ReviewVisitSection from './ReviewVisitSection';
import SectionDivider from './SectionDivider';

export default function CreateReviewPage({ postId }: { postId: string }) {
  const controller = useCreateReviewPage({ postId });
  const {
    handleBack,
    handleCancelLeave,
    handleConfirmLeave,
    handleSubmitReview,
    isSubmittingReview,
    leaveConfirmOpen,
    rating,
  } = controller;

  return (
    <>
      <header>
        <AppBar variant="navigation" title="장소 리뷰" onBack={handleBack} />
      </header>

      <form className="flex flex-col" noValidate onSubmit={handleSubmitReview}>
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
          <Button
            type="submit"
            size="large"
            fullWidth
            disabled={isSubmittingReview}
          >
            {isSubmittingReview ? '등록 중...' : '리뷰 등록하기'}
          </Button>
        </section>
      </form>
      <LeaveReviewDialog
        open={leaveConfirmOpen}
        onCancel={handleCancelLeave}
        onConfirm={handleConfirmLeave}
      />
    </>
  );
}
