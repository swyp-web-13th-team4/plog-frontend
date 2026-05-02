'use client';

import { useLayoutEffect, useRef, useState } from 'react';

import { Avatar } from '@plog/ui';

import { MOCK_FEED_DATA } from '@/views/feed/model/query/useInfiniteScroll';

import ArrowIcon from '@/shared/assets/icons/arrow.svg';

const BIO_COLLAPSED_LINE_COUNT = 1;
const BIO_OVERFLOW_THRESHOLD = 1;
const BIO_TEXT =
  '글자수백자글자수백자글자수백자글자수백자글자수백자글자수백자글자수백자글자수백자글자수백자글자수백자글자수백자글자수백자글자수백자글자수백자글자수백자글자수백자글자수백자글자수백자글자수백자글자수백자';

export default function UserProfileSection({ userId }: { userId: string }) {
  const user = MOCK_FEED_DATA.find(
    (item) => item.POST_INFO.USER_INFO.id === userId,
  );

  const userProfileInfo = user?.POST_INFO.USER_INFO;

  const [expandedUserId, setExpandedUserId] = useState<string | null>(null);
  const [isClamped, setIsClamped] = useState(false);

  const bioRef = useRef<HTMLParagraphElement>(null);
  const bioMeasureRef = useRef<HTMLParagraphElement>(null);
  const isExpanded = expandedUserId === userId;

  useLayoutEffect(() => {
    const bioEl = bioRef.current;
    const bioMeasureEl = bioMeasureRef.current;

    if (!bioEl || !bioMeasureEl) return;

    const updateIsClamped = () => {
      const lineHeight = parseFloat(getComputedStyle(bioEl).lineHeight);

      if (Number.isNaN(lineHeight)) {
        setIsClamped(false);
        return;
      }

      const collapsedHeight = lineHeight * BIO_COLLAPSED_LINE_COUNT;

      setIsClamped(
        bioMeasureEl.scrollHeight > collapsedHeight + BIO_OVERFLOW_THRESHOLD,
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
    resizeObserver.observe(bioEl);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  if (!user) return null;

  return (
    <section className="border-b border-b-semantic-object-subtler px-6 pt-2 pb-4">
      <div className="flex flex-col items-center justify-center gap-2 px-4 py-8">
        <Avatar
          size="small"
          src={userProfileInfo?.profileImage}
          alt={`${userProfileInfo?.nickname}의 프로필 이미지`}
        />

        <div className="flex max-w-70 flex-col items-center gap-1">
          <span className="title-md text-semantic-object-boldest">
            {userProfileInfo?.nickname}
          </span>

          <div className="relative w-full">
            <p
              ref={bioRef}
              className={`body-sm wrap-break-word text-semantic-object-boldest ${
                isExpanded ? 'line-clamp-none' : 'line-clamp-1'
              }`}
            >
              {BIO_TEXT}
            </p>

            <p
              ref={bioMeasureRef}
              aria-hidden="true"
              className="body-sm pointer-events-none invisible absolute top-0 left-0 w-full wrap-break-word text-semantic-object-boldest"
            >
              {BIO_TEXT}
            </p>
          </div>
          {isClamped && (
            <button
              type="button"
              aria-label={isExpanded ? 'bio 접기' : 'bio 더보기'}
              className="body-sm flex cursor-pointer items-center gap-1 text-semantic-object-subtle"
              onClick={() =>
                setExpandedUserId((prev) => (prev === userId ? null : userId))
              }
            >
              {isExpanded ? '접기' : '더보기'}
              <ArrowIcon
                className={`transition-transform duration-200 ${
                  isExpanded ? 'rotate-270' : 'rotate-90'
                }`}
              />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
