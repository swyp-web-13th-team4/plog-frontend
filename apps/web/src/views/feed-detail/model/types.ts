import { type FeedPost } from '@/entities/feed';

export type FeedDetail = FeedPost & {
  isAuthor: boolean;
};
