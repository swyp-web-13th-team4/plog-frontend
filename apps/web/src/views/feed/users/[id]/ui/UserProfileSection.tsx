'use client';

import { useLayoutEffect, useRef, useState } from 'react';

import { Avatar } from '@plog/ui';

import { MOCK_FEED_DATA } from '@/views/feed/model/query/useInfiniteScroll';

import ArrowIcon from '@/shared/assets/icons/arrow.svg';

export default function UserProfileSection({ userId }: { userId: string }) {
  const user = MOCK_FEED_DATA.find(
    (item) => item.POST_INFO.USER_INFO.id === userId,
  );

  const userProfileInfo = user?.POST_INFO.USER_INFO;

  const [isExpanded, setIsExpanded] = useState(false);
  const [isClamped, setIsClamped] = useState(false);

  const textRef = useRef<HTMLParagraphElement>(null);
  const measureRef = useRef<HTMLParagraphElement>(null);

  const bioText =
    'kshdkajsdhkasksdhkhasjdkhaskdaskdhksa129836721986721uydashgahjsdbajshcbjascjajhhjcabhjcasvkdhgcdshfㅍ너hddasljkdhaskdjashdkasdhklkasdhjlkasjdhkjh21jieg12iㅣㅏㅁㄴ옴너ㅗ안마오';

  useLayoutEffect(() => {
    const textEl = textRef.current;
    const measureEl = measureRef.current;

    if (!textEl || !measureEl) return;

    const lineHeight = parseFloat(getComputedStyle(textEl).lineHeight);

    const fullHeight = measureEl.scrollHeight;

    setIsClamped(fullHeight > lineHeight * 1.5);
  }, [bioText]);

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
              ref={textRef}
              className={`body-sm wrap-break-word text-semantic-object-boldest ${
                isExpanded ? 'line-clamp-none' : 'line-clamp-1'
              }`}
            >
              {bioText}
            </p>

            <p
              ref={measureRef}
              aria-hidden="true"
              className="body-sm pointer-events-none invisible absolute top-0 left-0 w-full wrap-break-word text-semantic-object-boldest"
            >
              {bioText}
            </p>
          </div>
          {isClamped && (
            <button
              type="button"
              aria-label={isExpanded ? 'bio 접기' : 'bio 더보기'}
              className="body-sm flex cursor-pointer items-center gap-1 text-semantic-object-subtle"
              onClick={() => setIsExpanded((prev) => !prev)}
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
