import { type ReactNode } from 'react';

import { Button } from '@plog/ui';

type WithdrawStepLayoutProps = {
  children: ReactNode;
  submitLabel: string;
  submitDisabled?: boolean;
  isSubmitting?: boolean;
  onCancel: () => void;
  onSubmit: () => void;
};

export default function WithdrawStepLayout({
  children,
  submitLabel,
  submitDisabled = false,
  isSubmitting = false,
  onCancel,
  onSubmit,
}: WithdrawStepLayoutProps) {
  return (
    <div className="flex min-h-[calc(100dvh-var(--spacing-bottom-tab))] w-full flex-col p-6 pt-[calc(24px+var(--spacing-header))]">
      {children}
      <div className="mt-auto flex gap-3 pt-10">
        <Button
          variant="secondary"
          size="large"
          className="flex-1"
          disabled={isSubmitting}
          onClick={onCancel}
        >
          취소
        </Button>
        <Button
          size="large"
          className="flex-1"
          disabled={submitDisabled}
          loading={isSubmitting}
          onClick={onSubmit}
        >
          {submitLabel}
        </Button>
      </div>
    </div>
  );
}
