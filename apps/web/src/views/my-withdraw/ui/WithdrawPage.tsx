'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { useMypageQuery } from '@/entities/user';

import { NavigationHeader } from '@/shared/ui';

import { type WithdrawReason } from '../model/constants';
import { useDeleteAccountMutation } from '../model/use-delete-account-mutation';
import NoticeStep from './NoticeStep';
import ReasonStep from './ReasonStep';

type Step = 'reason' | 'notice';

export default function WithdrawPage() {
  const router = useRouter();

  const [step, setStep] = useState<Step>('reason');
  const [reason, setReason] = useState<WithdrawReason | null>(null);
  const [etcDetail, setEtcDetail] = useState('');

  const { data: mypageData } = useMypageQuery();
  const { mutate: deleteAccount, isPending } = useDeleteAccountMutation();

  const goToSettings = () => router.push('/my/settings');

  const handleReasonChange = (nextReason: WithdrawReason) => {
    setReason(nextReason);
    if (nextReason !== 'etc') setEtcDetail('');
  };

  const handleSubmit = () => {
    if (!reason) return;
    deleteAccount({ reason, etcDetail: etcDetail.trim() });
  };

  return (
    <>
      <NavigationHeader
        title="회원 탈퇴"
        onBack={step === 'notice' ? () => setStep('reason') : undefined}
      />
      {step === 'reason' ? (
        <ReasonStep
          reason={reason}
          etcDetail={etcDetail}
          onReasonChange={handleReasonChange}
          onEtcDetailChange={setEtcDetail}
          onCancel={goToSettings}
          onNext={() => setStep('notice')}
        />
      ) : (
        <NoticeStep
          nickname={mypageData?.nickname ?? ''}
          isSubmitting={isPending}
          onCancel={goToSettings}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
}
