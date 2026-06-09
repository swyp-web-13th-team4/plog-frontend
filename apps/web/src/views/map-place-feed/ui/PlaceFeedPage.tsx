'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { useRouter, useSearchParams } from 'next/navigation';

import { AppBar, Spinner, TabGroup } from '@plog/ui';

import { FeedList, type RecordTypeValue } from '@/widgets/feed-list';

import { type FeedTypeBase, type PlaceTagValue } from '@/entities/feed';
import { type MapSortType, type PlaceLayer } from '@/entities/place';

import {
  BookmarkEmptyState,
  FetchErrorEmptyState,
  RecordEmptyState,
} from '@/shared/ui';

import { usePlaceFeedQuery } from '../model/use-place-feed-query';

const SORT_ITEMS: { value: RecordTypeValue; label: string }[] = [
  { value: 'latest', label: '최신순' },
  { value: 'focus', label: '집중도순' },
  { value: 'studyTime', label: '작업시간순' },
];

const SORT_MAP: Record<RecordTypeValue, MapSortType> = {
  latest: 'LATEST',
  focus: 'FOCUS',
  studyTime: 'STUDY_TIME',
  likes: 'LATEST',
};

function PlaceFeedList({
  placeId,
  layer,
}: {
  placeId: number;
  layer: PlaceLayer;
}) {
  const router = useRouter();
  const [sort, setSort] = useState<RecordTypeValue>('latest');
  const [tags, setTags] = useState<PlaceTagValue[]>([]);
  const { ref, inView } = useInView({ rootMargin: '0px 0px 200px 0px' });

  const {
    data,
    isPending,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePlaceFeedQuery(placeId, layer, SORT_MAP[sort], tags);

  const posts = data?.pages.flatMap((p) => p.content) ?? [];

  const feeds: FeedTypeBase[] = posts.map((post) => ({
    postId: post.postId,
    name: '',
    profileImage: '',
    createAt: post.studyDate,
    postImages: [post.thumbnailUrl],
    likes: 0,
    title: post.title,
    contents: post.contents,
    placeName: '',
    studyTime: post.studyTime,
    focus: post.focus,
    tags: post.tags,
    like: false,
    bookMark: false,
  }));

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isPending)
    return (
      <div className="flex flex-1 items-center justify-center">
        <Spinner size="large" />
      </div>
    );

  if (isError) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <FetchErrorEmptyState onRetry={refetch} />
      </div>
    );
  }

  if (feeds.length === 0 && tags.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center">
        {layer === 'record' ? <RecordEmptyState /> : <BookmarkEmptyState />}
      </div>
    );
  }

  return (
    <>
      <FeedList
        feeds={feeds}
        sort={sort}
        onSortChange={(v) => setSort(v as RecordTypeValue)}
        sortItems={SORT_ITEMS}
        tags={tags}
        onTagsChange={setTags}
        toolbarConfig={{ tagFilter: true }}
        emptyView={
          <div className="flex flex-1 items-center justify-center">
            {layer === 'record' ? (
              <RecordEmptyState
                title="일치하는 정보가 없어요"
                description="다른 태그를 선택해 보세요."
              />
            ) : (
              <BookmarkEmptyState
                title="일치하는 정보가 없어요"
                description="다른 태그를 선택해 보세요."
              />
            )}
          </div>
        }
        onFeedClick={(feed) => router.push(`/feed/${feed.postId}`)}
      />
      <div ref={ref} aria-hidden="true" />
    </>
  );
}

export default function PlaceFeedPage({ placeId }: { placeId: number }) {
  const router = useRouter();

  const searchParams = useSearchParams();

  const placeName = searchParams.get('name') || '장소 상세';
  const rawType = searchParams.get('type');
  const initType: PlaceLayer =
    rawType === 'record' || rawType === 'bookmark' ? rawType : 'record';

  const tabs = [
    {
      value: 'record',
      label: '내 기록',
      panel: <PlaceFeedList placeId={placeId} layer="record" />,
    },
    {
      value: 'bookmark',
      label: '북마크',
      panel: <PlaceFeedList placeId={placeId} layer="bookmark" />,
    },
  ];

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-10 mx-auto max-w-layout">
        <AppBar
          variant="navigation"
          title={placeName}
          onBack={() => router.back()}
        />
      </header>
      <div className="flex min-h-[calc(100dvh-var(--spacing-bottom-tab))] flex-col pt-[var(--spacing-header)]">
        <TabGroup
          items={tabs}
          defaultValue={initType}
          className="flex flex-1 flex-col"
          listClassName="sticky top-[var(--spacing-header)] z-10 border-b border-b-semantic-stroke-subtle bg-semantic-bg-standard"
          panelClassName="flex flex-1 py-5"
        />
      </div>
    </>
  );
}
