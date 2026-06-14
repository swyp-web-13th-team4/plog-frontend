import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import FeedDetailCard from '@/views/feed-detail/ui/FeedDetailCard';

import {
  type FeedDetailResponse,
  feedDetailResponseSchema,
} from '@/entities/feed';

import { API_ERROR_CODE } from '@/shared/api/constants';
import { ApiResponseError } from '@/shared/api/response.utils';
import { serverApi } from '@/shared/api/server-api';

type FeedDetailPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: FeedDetailPageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const post = await serverApi.get(`/feed/${id}`, feedDetailResponseSchema);
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

  let initialPost: FeedDetailResponse | undefined;

  try {
    initialPost = await serverApi.get(`/feed/${id}`, feedDetailResponseSchema);
  } catch (error) {
    if (
      error instanceof ApiResponseError &&
      error.errorCode === API_ERROR_CODE.POST_NOT_FOUND
    ) {
      notFound();
    }

    return <FeedDetailCard postId={id} />;
  }

  if (!initialPost) notFound();

  return <FeedDetailCard initialPost={initialPost} postId={id} />;
}
