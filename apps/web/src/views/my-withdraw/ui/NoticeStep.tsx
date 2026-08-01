'use client';

import { useId, useState } from 'react';

import { Checkbox } from '@plog/ui';

import { WITHDRAW_NOTICES } from '../model/constants';
import WithdrawStepLayout from './WithdrawStepLayout';

type NoticeStepProps = {
  nickname: string;
  isSubmitting: boolean;
  onCancel: () => void;
  onSubmit: () => void;
};

export default function NoticeStep({
  nickname,
  isSubmitting,
  onCancel,
  onSubmit,
}: NoticeStepProps) {
  const checkboxId = useId();
  const [confirmed, setConfirmed] = useState(false);

  return (
    <WithdrawStepLayout
      submitLabel="완료"
      submitDisabled={!confirmed}
      isSubmitting={isSubmitting}
      onCancel={onCancel}
      onSubmit={onSubmit}
    >
      <h2 className="title-md mb-2 text-semantic-object-boldest">
        {nickname} 님,
        <br />
        탈퇴하기 전에 확인해 주세요!
      </h2>
      <p className="body-sm mb-6 text-semantic-object-normal">
        탈퇴 후에는 계정 정보가 삭제되어 복구할 수 없습니다.
      </p>
      <section
        aria-label="탈퇴 유의 사항"
        className="flex min-w-0 flex-col rounded-xl border border-semantic-stroke-assistive bg-semantic-bg-deep p-4"
      >
        <h3 className="label-lg mb-3 text-semantic-object-bold">
          탈퇴 유의 사항
        </h3>
        <ul className="flex list-disc flex-col gap-2 pl-4">
          {WITHDRAW_NOTICES.map((notice) => (
            <li key={notice} className="body-sm text-semantic-object-normal">
              {notice}
            </li>
          ))}
        </ul>
      </section>
      <div className="mt-6 flex items-center gap-2">
        <Checkbox
          id={checkboxId}
          checked={confirmed}
          onCheckedChange={setConfirmed}
        />
        <label
          htmlFor={checkboxId}
          className="label-md cursor-pointer text-semantic-object-boldest"
        >
          유의 사항을 모두 확인했습니다.
        </label>
      </div>
    </WithdrawStepLayout>
  );
}
