'use client';

import { type ReactNode, useLayoutEffect, useRef, useState } from 'react';

import { Avatar, Icon } from '@plog/ui';
import { cn } from '@plog/utils';

import { type UserProfileType } from '../model/types';

type UserProfileProps = {
  profile: UserProfileType;
  className?: string;
  children?: ReactNode;
};

export default function UserProfile({
  profile,
  className,
  children,
}: UserProfileProps) {
  const [expanded, setExpanded] = useState(false);
  const [isClamped, setIsClamped] = useState(false);
  const introRef = useRef<HTMLParagraphElement>(null);

  const { nickname, profileImageUrl, introduction, mainBadge } = profile;

  useLayoutEffect(() => {
    const el = introRef.current;
    if (!el) return;
    setIsClamped(el.scrollHeight > el.clientHeight);
  }, [introduction]);

  return (
    <div className={cn('flex flex-col items-center gap-4 p-6', className)}>
      <Avatar size="small" src={profileImageUrl} alt={`${nickname} 프로필`} />
      <div className="flex flex-col items-center gap-1 text-center">
        <div className="relative flex items-center gap-2">
          <span className="title-md text-semantic-object-boldest">
            {nickname}
          </span>
          {mainBadge && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={mainBadge.imageUrl}
              width={24}
              height={24}
              alt={mainBadge.name}
              aria-label={`${mainBadge.name}. ${mainBadge.description}`}
              title={mainBadge.description}
              className="absolute right-0 translate-x-8"
            />
          )}
        </div>
        {introduction && (
          <div className="flex flex-col items-center">
            <p
              ref={introRef}
              id="introduction"
              className={cn(
                'body-sm text-semantic-object-boldest',
                !expanded && 'line-clamp-1',
              )}
            >
              {introduction}
            </p>
            {isClamped && (
              <button
                type="button"
                aria-expanded={expanded}
                aria-controls="introduction"
                onClick={() => setExpanded((prev) => !prev)}
                className="caption-md mt-2 flex cursor-pointer items-center gap-1 text-semantic-object-normal"
              >
                {expanded ? '접기' : '더보기'}
                <Icon
                  name={expanded ? 'chevron-up' : 'chevron-down'}
                  size={16}
                />
              </button>
            )}
          </div>
        )}
      </div>
      {children}
    </div>
  );
}
