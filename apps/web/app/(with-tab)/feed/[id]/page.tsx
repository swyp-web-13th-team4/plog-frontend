import { Suspense } from 'react';

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import FeedDetailContent from '@/views/feed-detail/ui/FeedDetailContent';
import FeedDetailSkeleton from '@/views/feed-detail/ui/FeedDetailSkeleton';

import { getFeedPost } from '@/entities/feed/api/server';

type FeedDetailPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: FeedDetailPageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const post = await getFeedPost(id);
    const thumbnail = post.postImages[0];
    const title = post.title;
    const description = post.contents;
    const images = thumbnail
      ? [{ url: thumbnail, width: 480, height: 480, alt: post.title }]
      : undefined;

    return {
      title,
      description,
      openGraph: {
        type: 'article',
        siteName: '플로그',
        title,
        description,
        locale: 'ko_KR',
        images,
      },
      twitter: {
        card: thumbnail ? 'summary_large_image' : 'summary',
        title,
        description,
        images: thumbnail ? [thumbnail] : undefined,
      },
    };
  } catch {
    return {};
  }
}

export default async function Page({ params }: FeedDetailPageProps) {
  const { id } = await params;
  const numericPostId = Number(id);

  if (!Number.isInteger(numericPostId) || numericPostId <= 0) notFound();

  return (
    <Suspense fallback={<FeedDetailSkeleton />}>
      <FeedDetailContent id={id} />
    </Suspense>
  );
}
