'use client';

import { Button, Dialog } from '@plog/ui';

type DecisionReviewModalProps = {
  open: boolean;
  imageUrl?: string;
  placeName: string;
  onReview: () => void;
  onSkip: () => void;
};

export default function DecisionReviewModal({
  open,
  imageUrl,
  placeName,
  onReview,
  onSkip,
}: DecisionReviewModalProps) {
  return (
    <Dialog open={open} onOpenChange={(nextOpen) => !nextOpen && onSkip()}>
      <Dialog.Content>
        <Dialog.Header>
          {imageUrl && (
            <Dialog.Graphic>
              <div className="size-20 overflow-hidden rounded-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imageUrl}
                  alt={placeName}
                  className="size-full object-cover"
                />
              </div>
            </Dialog.Graphic>
          )}
          <Dialog.Title>{placeName}</Dialog.Title>
          <Dialog.Description>
            방문하신 장소의 솔직한 리뷰를 남겨볼까요?
          </Dialog.Description>
        </Dialog.Header>
        <Dialog.Actions layout="vertical">
          <Button variant="primary" size="medium" fullWidth onClick={onReview}>
            리뷰 작성하기
          </Button>
          <Button variant="secondary" size="medium" fullWidth onClick={onSkip}>
            다음에 하기
          </Button>
        </Dialog.Actions>
      </Dialog.Content>
    </Dialog>
  );
}
