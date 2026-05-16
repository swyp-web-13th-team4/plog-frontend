import type { Metadata } from 'next';

import { FeedDetailPage } from '@/views/feed-detail';

import { type FeedPost } from '@/entities/feed';

import { serverApi } from '@/shared/api/server-api';

type FeedDetailPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: FeedDetailPageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const post = await serverApi.get<FeedPost>(`/feed/${id}`);
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

export default FeedDetailPage;
