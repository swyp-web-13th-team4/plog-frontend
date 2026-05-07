'use client';

import { useState } from 'react';

import Link from 'next/link';

import { Avatar, Button, Icon } from '@plog/ui';
import { cn } from '@plog/utils';

import { useMypageQuery } from '@/entities/user';

export default function ProfileSection() {
  const [expanded, setExpanded] = useState(false);

  const { data } = useMypageQuery();

  if (!data) return null;

  const { nickname, profileImageUrl, introduction, mainBadge } = data;

  const shouldTruncate = (introduction?.length ?? 0) > 50 && !expanded;

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <Avatar size="small" src={profileImageUrl} alt={`${nickname} 프로필`} />
      <div className="flex flex-col items-center gap-1 text-center">
        <div className="flex items-center gap-2">
          <span className="title-md text-semantic-object-boldest">
            {nickname}
          </span>
          {mainBadge && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={mainBadge.imageUrl}
              alt={mainBadge.name}
              width={28}
              height={28}
            />
          )}
        </div>
        {introduction && (
          <div className="flex flex-col items-center">
            <p
              id="introduction"
              className={cn(
                'body-sm text-semantic-object-boldest',
                shouldTruncate && 'line-clamp-2',
              )}
            >
              {introduction}
            </p>
            {introduction.length > 50 && (
              <button
                type="button"
                aria-expanded={expanded}
                aria-controls="introduction"
                onClick={() => setExpanded((prev) => !prev)}
                className="caption-md mt-2 flex items-center gap-1 text-semantic-object-normal"
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
      <Button
        variant="outline"
        size="medium"
        fullWidth
        nativeButton={false}
        render={<Link href="/my/profile-edit" />}
      >
        프로필 편집
      </Button>
    </div>
  );
}
