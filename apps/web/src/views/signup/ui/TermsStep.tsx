'use client';

import Link from 'next/link';

import { Button, Checkbox, Divider, Icon } from '@plog/ui';

import { type TermsAgreements } from '@/entities/user';

import { NavigationHeader } from '@/shared/ui';

import { TERM_LIST, useTermsAgreement } from '../model/use-terms-agreement';

type TermsStepProps = {
  onNext: (agreements: TermsAgreements) => void;
};

export default function TermsStep({ onNext }: TermsStepProps) {
  const {
    agreed,
    allAgreed,
    someAgreed,
    requiredAgreed,
    toggleAll,
    toggle,
    markNavigation,
    getAgreements,
  } = useTermsAgreement();

  return (
    <>
      <NavigationHeader title="약관 동의" backTo="/login" />
      <div className="flex h-dvh w-full flex-col p-6 pt-[calc(24px+var(--spacing-header))]">
        <p className="title-xl mb-3 text-semantic-object-boldest">
          PLOG 서비스 이용약관에
          <br />
          동의해 주세요.
        </p>
        <p className="label-lg mb-6 text-semantic-object-normal">
          서비스 이용 전, 아래 항목을 확인해 주세요.
        </p>

        <fieldset className="flex min-w-0 flex-col rounded-xl border border-semantic-stroke-subtle p-3">
          <legend className="sr-only">이용약관 동의 항목</legend>
          <div className="flex items-center gap-2 px-3 py-4">
            <Checkbox
              id="agree-all"
              checked={allAgreed}
              indeterminate={someAgreed}
              onCheckedChange={toggleAll}
            />
            <label
              htmlFor="agree-all"
              className="label-lg cursor-pointer font-semibold text-semantic-object-boldest"
            >
              전체 동의
            </label>
          </div>
          <Divider />
          {TERM_LIST.map((term) => (
            <div key={term.id} className="flex items-center gap-2 px-3 py-4">
              <Checkbox
                id={term.id}
                checked={agreed.has(term.id)}
                onCheckedChange={() => toggle(term.id)}
              />
              <label
                htmlFor={term.id}
                className="label-md flex-1 cursor-pointer text-semantic-object-boldest"
              >
                {term.label}
              </label>
              {term.link && (
                <Link
                  href={term.link}
                  onClick={markNavigation}
                  aria-label={`${term.label} 전문 보기`}
                  className="flex shrink-0 items-center justify-center"
                >
                  <Icon
                    name="chevron-right-thick"
                    size={20}
                    className="text-semantic-object-subtle"
                  />
                </Link>
              )}
            </div>
          ))}
        </fieldset>
        <div className="mt-auto">
          <Button
            size="large"
            fullWidth
            disabled={!requiredAgreed}
            onClick={() => onNext(getAgreements())}
          >
            동의하고 계속하기
          </Button>
        </div>
      </div>
    </>
  );
}
