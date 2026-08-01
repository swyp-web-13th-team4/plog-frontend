'use client';

import { RadioGroup, Textarea } from '@plog/ui';

import {
  ETC_DETAIL_MAX_LENGTH,
  WITHDRAW_REASON_OPTIONS,
  type WithdrawReason,
} from '../model/constants';
import WithdrawStepLayout from './WithdrawStepLayout';

type ReasonStepProps = {
  reason: WithdrawReason | null;
  etcDetail: string;
  onReasonChange: (reason: WithdrawReason) => void;
  onEtcDetailChange: (etcDetail: string) => void;
  onCancel: () => void;
  onNext: () => void;
};

export default function ReasonStep({
  reason,
  etcDetail,
  onReasonChange,
  onEtcDetailChange,
  onCancel,
  onNext,
}: ReasonStepProps) {
  return (
    <WithdrawStepLayout
      submitLabel="다음"
      submitDisabled={!reason}
      onCancel={onCancel}
      onSubmit={onNext}
    >
      <h2 className="title-md mb-2 text-semantic-object-boldest">
        아쉬운 점이 있으셨나요?
      </h2>
      <p className="body-sm mb-6 text-semantic-object-normal">
        작성해 주신 의견을 바탕으로 더욱 발전하는 서비스가 될 수 있도록
        노력하겠습니다.
      </p>
      <RadioGroup
        aria-label="탈퇴 사유"
        items={WITHDRAW_REASON_OPTIONS}
        value={reason}
        onValueChange={(value) => onReasonChange(value as WithdrawReason)}
        className="gap-6"
        labelClassName="text-semantic-object-boldest"
      />
      {reason === 'etc' && (
        <Textarea
          aria-label="기타 탈퇴 사유"
          value={etcDetail}
          onChange={(e) => onEtcDetailChange(e.target.value)}
          maxLength={ETC_DETAIL_MAX_LENGTH}
          placeholder="사용하면서 아쉬웠던 점이 있다면 자유롭게 남겨 주세요"
          containerClassName="mt-6"
        />
      )}
    </WithdrawStepLayout>
  );
}
