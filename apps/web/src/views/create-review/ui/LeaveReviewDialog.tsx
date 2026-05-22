'use client';

import { Button, Dialog } from '@plog/ui';

type LeaveReviewDialogProps = {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function LeaveReviewDialog({
  open,
  onCancel,
  onConfirm,
}: LeaveReviewDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(nextOpen) => !nextOpen && onCancel()}>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>리뷰 작성을 그만둘까요?</Dialog.Title>
          <Dialog.Description>
            한 번 나가면 리뷰를 다시 작성할 수 없어요
          </Dialog.Description>
        </Dialog.Header>
        <Dialog.Actions>
          <Button
            type="button"
            variant="secondary"
            size="medium"
            fullWidth
            onClick={onCancel}
          >
            취소
          </Button>
          <Button
            type="button"
            variant="primary"
            size="medium"
            fullWidth
            onClick={onConfirm}
          >
            확인
          </Button>
        </Dialog.Actions>
      </Dialog.Content>
    </Dialog>
  );
}
