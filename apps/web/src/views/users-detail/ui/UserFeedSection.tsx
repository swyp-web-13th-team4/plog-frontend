'use client';

import { type MouseEvent, useEffect, useMemo, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Badge, Icon, IconButton, Select } from '@plog/ui';
import { cn } from '@plog/utils';

import {
  type FeedPost,
  type FeedTag,
  formatStudyDuration,
} from '@/entities/feed';
import { MOCK_FEED_DATA } from '@/entities/feed/model/mock-data';

import { ScrollToTopButton } from '@/shared/ui';

type RecordTypeValue = 'latest' | 'like' | 'concentrate';
type FeedType = 'list' | 'grid';
type BookmarkByPostId = Record<string, boolean>;

const SCROLL_TO_TOP_VISIBLE_OFFSET = 80;

const RECORD_OPTION_ITEMS: { value: RecordTypeValue; label: string }[] = [
  { value: 'latest', label: '최신순' },
  { value: 'like', label: '좋아요순' },
  { value: 'concentrate', label: '집중도순' },
];

function sortedRecord({
  feeds,
  sort,
}: {
  feeds: FeedPost[];
  sort: RecordTypeValue;
}): FeedPost[] {
  return [...feeds].sort((a, b) => {
    if (sort === 'latest')
      return b.POST_INFO.createdAt.localeCompare(a.POST_INFO.createdAt);
    if (sort === 'like') return b.POST_INFO.heartCount - a.POST_INFO.heartCount;
    if (sort === 'concentrate')
      return (
        b.POST_INFO.PLACE_INFO.concentrateCount -
        a.POST_INFO.PLACE_INFO.concentrateCount
      );
    return 0;
  });
}

function isRecordTypeValue(value: string): value is RecordTypeValue {
  return RECORD_OPTION_ITEMS.some((option) => option.value === value);
}

const DEFAULT_VISIBLE_TAG_COUNT = 2;

function TagBadgeGroup({ tags }: { tags: FeedTag[] }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const visibleTags = tags.slice(0, DEFAULT_VISIBLE_TAG_COUNT);
  const hiddenTags = tags.slice(DEFAULT_VISIBLE_TAG_COUNT);
  const hasHiddenTags = hiddenTags.length > 0;

  const handleTagGroupClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div className="flex gap-2" onClick={handleTagGroupClick}>
      {visibleTags.map((tag) => (
        <Badge
          key={tag.id}
          color="gray"
          variant="soft"
          className="caption-md flex items-center text-semantic-object-normal"
        >
          {tag.name}
        </Badge>
      ))}
      {hasHiddenTags && (
        <div className="relative">
          <Badge
            color="gray"
            variant="outline"
            className="caption-md flex cursor-pointer items-center text-semantic-object-normal"
            onClick={() => setIsExpanded((prev) => !prev)}
          >
            {`+${hiddenTags.length}`}
          </Badge>

          {isExpanded && (
            <div className="absolute left-0 z-10 mt-2 min-w-max rounded-lg border border-semantic-stroke-subtle bg-semantic-system-white p-2">
              <div className="flex flex-col gap-2">
                {hiddenTags.map((tag) => (
                  <Badge
                    key={tag.id}
                    color="gray"
                    variant="soft"
                    className="caption-md flex items-center text-semantic-object-normal"
                  >
                    {tag.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function SelectFeedType({
  feedType,
  recordType,
  onChangeFeedType,
  onChangeRecordType,
}: {
  feedType: FeedType;
  recordType: RecordTypeValue;
  onChangeFeedType: () => void;
  onChangeRecordType: (recordType: RecordTypeValue) => void;
}) {
  return (
    <div className="flex justify-between px-6">
      <Select
        value={recordType}
        items={RECORD_OPTION_ITEMS}
        placeholder={RECORD_OPTION_ITEMS[0].label}
        onValueChange={(value) => {
          if (typeof value === 'string' && isRecordTypeValue(value)) {
            onChangeRecordType(value);
          }
        }}
      />
      <IconButton
        aria-label={
          feedType === 'list'
            ? '그리드 형식으로 게시글 보기'
            : '리스트 형식으로 게시글 보기'
        }
        icon={feedType === 'list' ? <Icon name="grid" /> : <Icon name="list" />}
        size="small"
        variant="outline"
        onClick={onChangeFeedType}
      />
    </div>
  );
}

function BookmarkButton({
  isBookmarked,
  onClick,
  className,
}: {
  isBookmarked: boolean;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-label={isBookmarked ? '북마크 해제' : '북마크'}
      onClick={onClick}
      className={className}
    >
      {isBookmarked ? (
        <Icon name="bookmark-filled" className="text-semantic-accent-normal" />
      ) : (
        <Icon name="bookmark" className="text-semantic-object-subtle" />
      )}
    </button>
  );
}

function ListTypeFeed({
  feeds,
  bookmarks,
  onBookmark,
}: {
  feeds: FeedPost[];
  bookmarks: BookmarkByPostId;
  onBookmark: (postId: string, e: MouseEvent<HTMLButtonElement>) => void;
}) {
  const router = useRouter();

  return (
    <>
      {feeds.map((feed) => (
        <div
          key={feed.POST_INFO.id}
          onClick={() =>
            router.push(
              `/feed/${feed.POST_INFO.id}?backTo=${encodeURIComponent(`/feed/users/${feed.POST_INFO.USER_INFO.id}`)}`,
            )
          }
          className="flex cursor-pointer gap-4 border-b border-b-semantic-object-subtler bg-semantic-system-white px-6 py-5"
        >
          {/* 이미지 영역 */}

          <Image
            src={feed.POST_INFO.image[0]}
            alt={`${feed.POST_INFO.id}의 대표 이미지`}
            width={116}
            height={116}
            className="rounded-xl"
          />

          {/* 그 외 장소 정보들 */}
          <div className="flex min-w-0 flex-1 flex-col justify-between">
            {/* 뱃지 컴포넌트 + 북마크 아이콘 */}
            <div className="flex justify-between">
              <TagBadgeGroup tags={feed.POST_INFO.tags} />
              <BookmarkButton
                isBookmarked={
                  bookmarks[feed.POST_INFO.id] ?? feed.POST_INFO.isBookmarked
                }
                onClick={(e) => onBookmark(feed.POST_INFO.id, e)}
                className="cursor-pointer"
              />
            </div>
            {/* 타이틀 + 도로명 */}
            <div className="flex flex-col gap-1">
              <span className="label-lg text-semantic-object-boldest">
                {feed.POST_INFO.title}
              </span>
              <span className="caption-md truncate text-semantic-object-normal">
                {feed.POST_INFO.content}
              </span>
            </div>
            {/* 카테고리 + 공부 시간 + 집중도 */}
            <div className="flex gap-3">
              <div className="flex items-center gap-1">
                <Icon
                  name="pin"
                  size={16}
                  className="text-semantic-object-subtle"
                />
                <span className="caption-md text-semantic-object-bold">
                  {feed.POST_INFO.PLACE_INFO.category}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Icon
                  name="clock"
                  size={16}
                  className="text-semantic-object-subtle"
                />
                <span className="caption-md text-semantic-object-bold">
                  {formatStudyDuration(feed.POST_INFO.PLACE_INFO.studyTime)}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Icon
                  name="fire"
                  size={16}
                  className="text-semantic-object-subtle"
                />
                <span className="caption-md text-semantic-object-bold">
                  {`집중도 ${feed.POST_INFO.PLACE_INFO.concentrateCount}`}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

function GridTypeFeed({
  feeds,
  bookmarks,
  onBookmark,
}: {
  feeds: FeedPost[];
  bookmarks: BookmarkByPostId;
  onBookmark: (postId: string, e: MouseEvent<HTMLButtonElement>) => void;
}) {
  const router = useRouter();
  return (
    <div className="grid grid-cols-2 gap-6 px-5 py-6">
      {feeds.map((feed) => (
        <div
          key={feed.POST_INFO.id}
          onClick={() =>
            router.push(
              `/feed/${feed.POST_INFO.id}?backTo=${encodeURIComponent(`/feed/users/${feed.POST_INFO.USER_INFO.id}`)}`,
            )
          }
          className="flex cursor-pointer flex-col gap-4"
        >
          <div className="relative overflow-hidden rounded-lg">
            <Image
              src={feed.POST_INFO.image[0]}
              alt={`${feed.POST_INFO.id}의 대표 이미지`}
              width={204}
              height={204}
              className="w-full object-cover"
            />

            {/* 공부 시간 + 북마크 */}
            <div className="absolute inset-x-3 top-3 flex items-center justify-between">
              <div className="flex items-center gap-1 text-semantic-object-subtler [&_path]:fill-semantic-object-subtler">
                <Icon name="clock" />
                <span className="caption-md">
                  {formatStudyDuration(feed.POST_INFO.PLACE_INFO.studyTime)}
                </span>
              </div>
              <div>
                <BookmarkButton
                  isBookmarked={
                    bookmarks[feed.POST_INFO.id] ?? feed.POST_INFO.isBookmarked
                  }
                  onClick={(e) => onBookmark(feed.POST_INFO.id, e)}
                  className={cn(
                    'cursor-pointer',
                    (bookmarks[feed.POST_INFO.id] ??
                      feed.POST_INFO.isBookmarked)
                      ? '[&_path]:fill-semantic-accent-normal'
                      : '[&_path]:fill-semantic-object-subtler',
                  )}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="label-lg text-semantic-object-boldest">
              {feed.POST_INFO.title}
            </span>
            <TagBadgeGroup tags={feed.POST_INFO.tags} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function UserFeedSection({ userId }: { userId: string }) {
  const userFeeds = useMemo(
    () =>
      MOCK_FEED_DATA.filter((item) => item.POST_INFO.USER_INFO.id === userId),
    [userId],
  );

  const [feedType, setFeedType] = useState<FeedType>('list');
  const [recordType, setRecordType] = useState<RecordTypeValue>('latest');
  const [bookmarks, setBookmarks] = useState<BookmarkByPostId>({});
  const [canShowScrollToTopButton, setCanShowScrollToTopButton] =
    useState(false);

  const sortedUserFeeds = useMemo(
    () => sortedRecord({ feeds: userFeeds, sort: recordType }),
    [recordType, userFeeds],
  );

  const handleChangeFeedType = () => {
    setFeedType((prev) => (prev === 'list' ? 'grid' : 'list'));
  };

  const handleBookmark = (postId: string, e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    setBookmarks((prev) => {
      const feed = userFeeds.find((item) => item.POST_INFO.id === postId);
      const currentValue =
        prev[postId] ?? feed?.POST_INFO.isBookmarked ?? false;

      return {
        ...prev,
        [postId]: !currentValue,
      };
    });
  };

  useEffect(() => {
    const updateScrollToTopButtonState = () => {
      setCanShowScrollToTopButton(
        document.documentElement.scrollHeight > window.innerHeight &&
          window.scrollY > SCROLL_TO_TOP_VISIBLE_OFFSET,
      );
    };

    updateScrollToTopButtonState();
    window.addEventListener('scroll', updateScrollToTopButtonState);
    window.addEventListener('resize', updateScrollToTopButtonState);

    return () => {
      window.removeEventListener('scroll', updateScrollToTopButtonState);
      window.removeEventListener('resize', updateScrollToTopButtonState);
    };
  }, [sortedUserFeeds.length]);

  return (
    <section className="pt-3">
      <SelectFeedType
        feedType={feedType}
        recordType={recordType}
        onChangeFeedType={handleChangeFeedType}
        onChangeRecordType={setRecordType}
      />
      {feedType === 'list' ? (
        <ListTypeFeed
          feeds={sortedUserFeeds}
          bookmarks={bookmarks}
          onBookmark={handleBookmark}
        />
      ) : (
        <GridTypeFeed
          feeds={sortedUserFeeds}
          bookmarks={bookmarks}
          onBookmark={handleBookmark}
        />
      )}
      <ScrollToTopButton visible={canShowScrollToTopButton} />
    </section>
  );
}
