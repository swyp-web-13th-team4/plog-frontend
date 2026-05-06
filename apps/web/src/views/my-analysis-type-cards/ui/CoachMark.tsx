'use client';

import { useEffect, useRef } from 'react';

import { Icon } from '@plog/ui';

import CoachMarkGraphic from '@/shared/assets/images/coach-mark.svg';

export default function CoachMark({ onClick }: { onClick: () => void }) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeButtonRef.current?.focus();
  }, []);

  const handleKeyDown = (e: { key: string; preventDefault: () => void }) => {
    if (e.key === 'Escape') onClick();
    if (e.key === 'Tab') e.preventDefault();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="카드 뒤집기 안내"
      className="fixed inset-0 z-50 mx-auto max-w-layout animate-fade-in cursor-pointer bg-semantic-system-black/80"
      onClick={onClick}
      onKeyDown={handleKeyDown}
    >
      <button
        ref={closeButtonRef}
        aria-label="닫기"
        className="absolute top-4 right-4 size-11 cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      >
        <Icon name="close" size={32} className="text-semantic-object-subtle" />
      </button>
      <div className="absolute top-3/5 left-1/2 flex w-full -translate-x-1/2 -translate-y-3/5 flex-col items-center gap-5">
        <CoachMarkGraphic className="size-24 animate-float" />
        <p className="label-lg animate-pulse text-center text-semantic-object-inverse">
          카드를 터치 해{' '}
          <span className="text-semantic-accent-neutral">뒷면의 유형 지표</span>
          를 확인해 보세요.
        </p>
      </div>
    </div>
  );
}
