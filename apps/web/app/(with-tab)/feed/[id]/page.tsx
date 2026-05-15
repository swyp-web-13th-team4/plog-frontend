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
    const title = `${post.title} - 플로그`;
    const description = post.contents;

    return {
      title,
      description,
      openGraph: {
        type: 'article',
        title,
        description,
        images: thumbnail
          ? [{ url: thumbnail, width: 480, height: 480, alt: post.title }]
          : undefined,
      },
    };
  } catch {
    return {};
  }
}

export default FeedDetailPage;
