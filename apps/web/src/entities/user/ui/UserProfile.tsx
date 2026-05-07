'use client';

import { type ReactNode, useLayoutEffect, useRef, useState } from 'react';

import { Avatar, Icon } from '@plog/ui';
import { cn } from '@plog/utils';

import { UserProfileType } from '../model/types';
import UserProfileMainBadge from './UserProfileMainBadge';

const INTRODUCTION_COLLAPSED_LINE_COUNT = 1;
const INTRODUCTION_OVERFLOW_THRESHOLD = 1;

type UserProfileSectionProps = {
  profile: UserProfileType;
  className?: string;
  renderAction?: (profile: UserProfileType) => ReactNode;
};

export default function UserProfile({
  profile,
  className,
  renderAction,
}: UserProfileSectionProps) {
  const [expandedProfileId, setExpandedProfileId] = useState<string | null>(
    null,
  );
  const [isClamped, setIsClamped] = useState(false);

  const introductionRef = useRef<HTMLParagraphElement>(null);
  const introductionMeasureRef = useRef<HTMLParagraphElement>(null);
  const introduction = profile.introduction ?? '';
  const hasIntroduction = introduction.length > 0;
  const isExpanded = expandedProfileId === profile.id;

  useLayoutEffect(() => {
    if (!hasIntroduction) {
      return;
    }

    const introductionEl = introductionRef.current;
    const introductionMeasureEl = introductionMeasureRef.current;

    if (!introductionEl || !introductionMeasureEl) return;

    const updateIsClamped = () => {
      const lineHeight = parseFloat(
        getComputedStyle(introductionEl).lineHeight,
      );

      if (Number.isNaN(lineHeight)) {
        setIsClamped(false);
        return;
      }

      const collapsedHeight = lineHeight * INTRODUCTION_COLLAPSED_LINE_COUNT;

      setIsClamped(
        introductionMeasureEl.scrollHeight >
          collapsedHeight + INTRODUCTION_OVERFLOW_THRESHOLD,
      );
    };

    updateIsClamped();

    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', updateIsClamped);

      return () => {
        window.removeEventListener('resize', updateIsClamped);
      };
    }

    const resizeObserver = new ResizeObserver(updateIsClamped);
    resizeObserver.observe(introductionEl);

    return () => {
      resizeObserver.disconnect();
    };
  }, [introduction, hasIntroduction]);

  return (
    <section
      className={cn(
        'border-b border-b-semantic-object-subtler px-6 pt-2 pb-4',
        className,
      )}
    >
      <div className="flex flex-col items-center justify-center gap-2 px-4 py-8">
        <Avatar
          size="small"
          src={profile.profileImage}
          alt={`${profile.nickname}의 프로필 이미지`}
        />

        <div className="flex max-w-70 flex-col items-center gap-1">
          <div className="grid w-full grid-cols-[1fr_auto_1fr] items-center">
            <span className="title-md col-start-2 text-semantic-object-boldest">
              {profile.nickname}
            </span>

            {profile.mainBadge && (
              <span className="col-start-3 ml-2 flex items-center justify-self-start">
                <UserProfileMainBadge badge={profile.mainBadge} />
              </span>
            )}
          </div>
          {hasIntroduction && (
            <div className="relative w-full">
              <p
                ref={introductionRef}
                className={`body-sm wrap-break-word text-semantic-object-boldest ${
                  isExpanded ? 'line-clamp-none' : 'line-clamp-1'
                }`}
              >
                {introduction}
              </p>

              <p
                ref={introductionMeasureRef}
                aria-hidden="true"
                className="body-sm pointer-events-none invisible absolute top-0 left-0 w-full wrap-break-word text-semantic-object-boldest"
              >
                {introduction}
              </p>
            </div>
          )}

          {isClamped && (
            <button
              type="button"
              aria-label={
                isExpanded ? 'introduction 접기' : 'introduction 더보기'
              }
              className="body-sm flex cursor-pointer items-center gap-1 text-semantic-object-subtle"
              onClick={() =>
                setExpandedProfileId((prev) =>
                  prev === profile.id ? null : profile.id,
                )
              }
            >
              {isExpanded ? '접기' : '더보기'}
              <Icon
                size={16}
                name={isExpanded ? 'chevron-up' : 'chevron-down'}
              />
            </button>
          )}

          {renderAction?.(profile)}
        </div>
      </div>
    </section>
  );
}
