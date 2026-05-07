'use client';

import { useEffect, useMemo, useState } from 'react';

import { useRouter } from 'next/navigation';

import { Icon, IconButton, Select } from '@plog/ui';
import { cn } from '@plog/utils';

import { BookmarkButton } from '@/features/toggle-bookmark';

import { type FeedPost, GridFeed, ListFeed } from '@/entities/feed';
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

export default function UserFeedSection({ userId }: { userId: string }) {
  const router = useRouter();

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

  const handleBookmark = (postId: string) => {
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

  const handleFeedClick = (feed: FeedPost) => {
    router.push(
      `/feed/${feed.POST_INFO.id}?backTo=${encodeURIComponent(`/feed/users/${feed.POST_INFO.USER_INFO.id}`)}`,
    );
  };

  const renderBookmarkAction = (feed: FeedPost, variant: FeedType) => {
    const isBookmarked =
      bookmarks[feed.POST_INFO.id] ?? feed.POST_INFO.isBookmarked;

    return (
      <BookmarkButton
        postId={feed.POST_INFO.id}
        isBookmarked={isBookmarked}
        onToggle={handleBookmark}
        className={cn(
          variant === 'grid' &&
            (isBookmarked
              ? '[&_path]:fill-semantic-accent-normal'
              : '[&_path]:fill-semantic-object-subtler'),
        )}
      />
    );
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
        <ListFeed
          feeds={sortedUserFeeds}
          onFeedClick={handleFeedClick}
          renderAction={(feed) => renderBookmarkAction(feed, 'list')}
        />
      ) : (
        <GridFeed
          feeds={sortedUserFeeds}
          onFeedClick={handleFeedClick}
          renderAction={(feed) => renderBookmarkAction(feed, 'grid')}
        />
      )}
      <ScrollToTopButton visible={canShowScrollToTopButton} />
    </section>
  );
}
